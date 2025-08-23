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
import Link from "next/link";;
import { fetchProducts, fetchUserProducts } from "@/action/products";
import { CreateProductDialog } from "@/components/shared/forms";
import { ProductCard } from "@/components/products/product-card";
import { redirect } from "next/navigation";
import { getUser } from "@/action/user";


export default async function Profile() {
    const { user } = await validateRequest();

    if(!user) {
        redirect('/login')
    }

    const {user: userInfo} = await getUser(user.id)

    const products = await fetchProducts(undefined,undefined,true)
    return (
        <div className="dark:bg-black h-dvh w-full dark:text-white flex justify-center">
            <div className="w-full h-full max-w-4xl p-4 flex flex-col gap-4">
                
                {/* Header */}
                <div className="w-full flex justify-between items-center">
                    <Link href="/feed" >
                        <Button size={'icon'}>
                            <ChevronLeft />
                        </Button>
                    </Link>
                    <h1>{user?.username}</h1>
                    <Button size={'icon'}>
                        <Ellipsis />
                    </Button>
                </div>

                {/* Profile Info */}
                <div className="flex not-md:flex-col w-full gap-4 items-center px-4">
                    <Avatar className="w-25 md:w-35 lg:w-45 h-25 md:h-35 lg:h-45">
                        <AvatarImage src={userInfo?.avatarUrl || "https://github.com/shadcn.png"} className="object-cover" />
                        <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="w-full space-y-2">
                        <div>
                            <h2 className="text-lg md:text-2xl lg:text-3xl font-medium not-md:text-center">{user?.username}</h2>
                            <h2 className="text-sm text-black/80 dark:text-white/50 font-light not-md:text-center">{user?.email}</h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="w-auto flex flex-col justify-center items-center">
                                <span className="text-xl text-black/80 dark:text-white/80 font-medium">4850</span>
                                <span className="text-sm text-black/80 dark:text-white/50">Follower</span>
                            </div>
                            <div className="w-auto flex flex-col justify-center items-center">
                                <span className="text-xl text-black/80 dark:text-white/80 font-medium">850</span>
                                <span className="text-sm text-black/80 dark:text-white/50">Following</span>
                            </div>
                            <div className="w-auto flex flex-col justify-center items-center">
                                <span className="text-xl text-black/80 dark:text-white/80 font-medium">14850</span>
                                <span className="text-sm text-black/80 dark:text-white/50">Likes</span>
                            </div>
                        </div>
                        <div>
                            <Link href={'/edit_profile'} >
                                <Button className="bg-yellow-300 text-black hover:bg-yellow-400 cursor-pointer ">
                                    <Edit/>
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabs Section with Scrollable Content */}
                <div className="flex-1 w-full flex flex-col overflow-hidden">
                    <Tabs defaultValue="shop" className="flex-1 flex flex-col overflow-hidden">
                        <TabsList className="w-full flex gap-2 bg-transparent">
                            <TabsTrigger
                                value="shop"
                                className="data-[state=active]:border-b-2 dark:data-[state=active]:border-b-2 not-dark:text-black not-data-[state=active]:border-b-0 dark:not-data-[state=active]:border-b-0 border-b-blue-500 dark:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:bg-transparent text-white px-4 py-2  rounded-none"
                            >
                                Shop
                            </TabsTrigger>
                            <TabsTrigger
                                value="feed"
                                className="data-[state=active]:border-b-2 dark:data-[state=active]:border-b-2 not-dark:text-black not-data-[state=active]:border-b-0 dark:not-data-[state=active]:border-b-0 border-b-blue-500 dark:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:bg-transparent text-white px-4 py-2  rounded-none"
                            >
                                Feed
                            </TabsTrigger>
                            <TabsTrigger
                                value="reel"
                                className="data-[state=active]:border-b-2 dark:data-[state=active]:border-b-2 not-dark:text-black not-data-[state=active]:border-b-0 dark:not-data-[state=active]:border-b-0 border-b-blue-500 dark:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:bg-transparent text-white px-4 py-2  rounded-none"
                            >
                                Reel
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="shop" className="flex-1 overflow-hidden relative">
                            <ScrollArea className="h-full w-full overflow-y-auto ">
                                <div className="grid grid-cols-3 gap-4" >
                                    {
                                        products.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))
                                    }
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="feed" className="flex-1 overflow-hidden">
                            <ScrollArea className="h-full w-full overflow-y-auto">
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 50 }).map((_, indx) => (
                                        <div key={indx} className="rounded-xl h-50 bg-gray-700"></div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="reel" className="flex-1 overflow-hidden">
                            <ScrollArea className="h-full w-full overflow-y-auto">
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 50 }).map((_, indx) => (
                                        <div key={indx} className="rounded-xl h-50 bg-rose-700"></div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    );
}
