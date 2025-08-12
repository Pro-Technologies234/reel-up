import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/validate-user";
import { ChevronLeft, Edit, Ellipsis} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EditProfileForm } from "@/components/shared/edit-profile-form";


export default async function EditProfile() {
    const { user } = await validateRequest();

    return (
        <div className="bg-black h-dvh w-full text-white flex justify-center">
            <div className="w-full h-full max-w-4xl p-4 flex flex-col gap-4">
                
                {/* Header */}
                <div className="w-full flex justify-between items-center">
                    <Button size={'icon'}>
                        <ChevronLeft />
                    </Button>
                    <h1>{user?.username}</h1>
                    <Button size={'icon'}>
                        <Ellipsis />
                    </Button>
                </div>
                <EditProfileForm/>
            </div>
        </div>
    );
}
