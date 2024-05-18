import KnowMoreButton from "./knowMoreButton"
export default function StepsCard({number, title, description,heading,desc,button,route, image,css,bcolor}) {
    return (
        <div className='flex flex-col justify-center items-center bg-slate-200 pb-4'>
          <div className={`flex  text-xl rounded-full border justify-center items-center h-[50px] w-[50px] border-${bcolor} mt-20`}> <span className='text-2xl text-blue-400'>{number}</span> </div>
          <div> 
          <h1 className='text-[4vw] font-serif'>{title}</h1>
          </div>
          <div>
          <h1 className='text-[2vw]'>{description}</h1>
          </div>
          <div className={`flex ${css}  border rounded-3xl w-4/5 p-10 mt-10 bg-gradient-to-br from-white to-blue-600`}>
            <div className='flex flex-col w-1/2 gap-6 items-center justify-center'>
                <div>
                <h1 className='text-[3vw] font-semibold'>{heading}</h1>
                </div>
                <div className='flex flex-wrap'> 
                <h1 className='text-[1vw] text-wrap font-medium'>{desc}</h1>
                </div>
                <div>
                  <KnowMoreButton title={button} route={route}/>
                </div>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
              <img src={image} className='h-[40vh] w-auto rounded-xl' />
            </div>
          </div>
        </div>
    )};