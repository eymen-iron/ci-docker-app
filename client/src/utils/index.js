
import Swal from 'sweetalert2';
import axios from 'axios';

const getObjectDataByKey = (data, key) => {
  if (data.hasOwnProperty(key)) {
    return data[key];
  }
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

function setFloat(value) {
  if (value.includes('.')) {
    return parseFloat(value);
  } else if (value.includes(',')) {
    return parseFloat(value.replace(',', '.'));
  }
}

function setBool(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
}

function parseErrorMessages(errorObj) {
  let messages = [];
  if (errorObj && typeof errorObj.message === 'object') {
    for (let key in errorObj.message) {
      messages.push(errorObj.message[key]);
    }
  }
  return messages.join('<br>');
}


const sendData = async (e, inputValue) => {
  e.preventDefault();
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/add_product`, inputValue, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    if (result.data?.success === true) {
      Swal.fire({
        title: 'Başarılı',
        icon: 'success',
        text: result.data.message,
        confirmButtonText: 'Tamam'
      }).then(() => {
        if (window !== undefined) {
          localStorage.removeItem('product-input');
          window.location.href = '/';
        }
      });
    } else {
      Swal.fire({
        title: 'Hata Oluştu!',
        icon: 'error',
        html: parseErrorMessages(result.data.message),
        confirmButtonText: 'Tamam'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Hata Oluştu!',
      icon: 'error',
      text: error.message,
      confirmButtonText: 'Tamam'
    });
  }

};
const deleteData = async (id) => {
  if (typeof id !== 'object' || id.length === 0) {
    Swal.fire({
      title: 'Hata Oluştu!',
      icon: 'error',
      text: 'Lütfen seçim yapınız',
      confirmButtonText: 'Tamam'
    });
    return;
  }
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/delete_products`, { id: id });

    if (result.data?.success === true) {
      Swal.fire({
        title: 'Başarılı',
        icon: 'success',
        text: result.data.message,
        confirmButtonText: 'Tamam'
      }).then(() => {
        if (window !== undefined) {
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        title: 'Hata Oluştu!',
        icon: 'error',
        text: result.data.message,
        confirmButtonText: 'Tamam'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Hata Oluştu!',
      icon: 'error',
      text: error.message,
      confirmButtonText: 'Tamam'
    });
  }
}


const updateData = async (id, data) => {
  // console.log(data);
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/update_product/${id}`, data ,
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}
    );
    if (result.data?.success === true) {
      console.log(result.data);
      Swal.fire({
        title: 'Başarılı',
        icon: 'success',
        text: result.data.message,
        confirmButtonText: 'Tamam'
      })
        .then(() => {
          if (window !== undefined) {
            window.location.href = '/';
          }
        });
    } else {
      Swal.fire({
        title: 'Hata Oluştu!',
        icon: 'error',
        text: parseErrorMessages(result.data.message),
        confirmButtonText: 'Tamam'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Hata Oluştu!',
      icon: 'error',
      text: error.message,
      confirmButtonText: 'Tamam'
    });
  }
};



const cancelData = e => {
  e.preventDefault();
  if (window !== undefined) {
    Swal.fire({
      title: 'İptal',
      icon: 'error',
      text: 'Emin misiniz?',
      confirmButtonText: 'Evet İptal Et',
      cancelButtonText: 'Hayır',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (window !== undefined) {
          window.location.href = '/';

        }
      }

    });
  }
}

export {
  getObjectDataByKey,
  isEmpty,
  setFloat,
  parseErrorMessages,
  sendData,
  deleteData,
  updateData,
  cancelData,
  setBool
}