import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { authStore } from '@/store/authStore'
import { AlertCircleIcon, EyeOff } from 'lucide-react'

export default function CreateAlert() {
  const { isCreate, user, setIsCreate } = authStore()
  return (
    <>
      {isCreate && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
          <Card className="border-0 bg-secondary rounded-lg py-11 px-5">
            <CardContent>
              <h3 className="text-xl font-semibold tracking-wider font-mac">
                Welcome, {user?.displayName}
              </h3>
              <p className="text-sm font-normal tracking-wide mt-1 mb-7">
                Thank You! to be a part of our service.
              </p>
              <Alert className="bg-transparent!">
                <AlertCircleIcon />
                <AlertTitle>Please Read</AlertTitle>
                <AlertDescription>
                  <ul className="list-inside list-disc text-sm">
                    <li>Try to feedback us if you face any Problem</li>
                    <li>This is project is a Education Project.</li>
                    <li>
                      If you want to make it Secure ? We are happy to have you.{' '}
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
              <Button
                className="mt-5 float-end px-7!"
                size={'sm'}
                onClick={() => setIsCreate(false)}
              >
                <EyeOff />
                Hide
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
