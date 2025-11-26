import { ReactNode } from "react"

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-screen  bg-[url(/background.png)] bg-cover bg-right">
        <div className="h-full backdrop-blur-xs flex justify-center items-center ">
            {children}
        </div>
    </div>
  )
}

export default layout