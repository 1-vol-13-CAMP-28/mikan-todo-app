import HomeImage from './component/KotatuRoomBackground'
import BackgroundSrc from './public/image/HomeImage.png'
import KotatuSrc from './public/image/Kotatu.png'
import {MikanTasks} from "@/app/mikanTasks";

export default function Home() {
  return (
    <main className="size-full">
        <div className="bg-cover bg-center bg-fixed">
            <HomeImage backgroundsrc = {BackgroundSrc} kotatusrc ={KotatuSrc}/>
            <div id="task-canvas" className="absolute top-0 left-0">
                <MikanTasks tasks={
                    [
                        {
                            id: "0",
                            text: "タスク1",
                            visual: "normal",
                            done: false
                        },
                        {
                            id: "1",
                            text: "タスク2",
                            visual: "bad",
                            deadline: "2024-01-20",
                            done: false
                        },
                        {
                            id: "2",
                            text: "タスク2",
                            visual: "important",
                            done: false
                        }
                    ]
                }/>
            </div>
        </div>
    </main>
  )
}
