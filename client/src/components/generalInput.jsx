

export default function generalInput({ children, ...props }) {
  return (
    <label className='flex items-start gap-2 border-t  border-gray-300 py-4'>
      <div className="inline-flex flex-col gap-0 relative w-[300px]">
        <span className="text-md font-medium text-gray-900 mb-[-7px]">
          {props.required && <span className='text-red-500'>*</span>}
          {props?.title}
        </span>
        <span className="mt-1 text-[12px] text-gray-500">
          {props?.description}
        </span>
      </div>
      <div className="relative rounded-md h-full my-auto  w-[calc(100%-300px)]">
        {children}
      </div>
    </label>
  )
}
