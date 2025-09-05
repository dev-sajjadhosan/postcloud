import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { PlayCircle } from 'lucide-react'

export default function QuickDemo() {
  return (
    <>
      <div className="flex flex-col p-5">
        <h3 className="text-4xl">Quick Demo</h3>
        <Card className="w-3xl h-96 mx-auto mt-5">
          <CardContent>video</CardContent>
          <CardFooter>
            <Button>
              <PlayCircle size={21} /> Play Demo
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-15 space-y-2.5">
          <h3 className="text-xl">Tutorial Summary</h3>
          <p className="text-sm tracking-wide font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus laborum nulla vitae inventore praesentium incidunt
            vel, repellendus nesciunt atque amet autem eveniet placeat modi
            fugiat suscipit nobis id unde quis aut perferendis neque hic,
            voluptas voluptate adipisci. Repellat ullam natus placeat, ipsum
            magnam aut eius debitis recusandae distinctio! Labore, vel eaque!
            Modi vitae consequatur, magnam dolor ipsa voluptatem expedita autem
            maiores temporibus. Asperiores illo ab saepe. Expedita deserunt,
            repudiandae officiis animi labore vero tempore nihil corrupti
            deleniti ducimus inventore iusto perspiciatis cupiditate soluta at
            dolores temporibus eum. Incidunt repellat aperiam tempora
            consectetur est consequuntur eum ex ab nisi illum assumenda fugiat
            ea repellendus, a porro nesciunt non obcaecati exercitationem sed
            tenetur cupiditate laudantium aut. Qui perferendis, officiis,
        cta sit? Deserunt necessitatibus,
            sit nihil consectetur itaque corporis, maiores quia ab quae
            voluptatibus sunt porro quas. Similique praesentium corporis amet
            ex. Et, libero eaque distinctio perspiciatis unde incidunt
            cupiditate assumenda quos? Voluptates animi nesciunt earum minima
            beatae est quis? Quisquam, quasi. Commodi ratione vel, dicta dolorem
            eum qui suscipit reiciendis deserunt porro. Ex, quaerat rerum quam
            nam porro odio laboriosam culpa, id eligendi autem inventore.
          </p>
        </div>
      </div>
    </>
  )
}
