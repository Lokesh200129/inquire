"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { usePostForm } from "@/lib/post-form-modal";
import { ImagePreview } from "./image-preview";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function PostFormModal() {
    const { isModalOpen } = useModalStore();
    const { form, onSubmit, handleCancel, user } = usePostForm();

    const imageFile = form.watch("questionImage")?.[0];

    const title = form.watch("title");
    const content = form.watch("content");
    const isInvalid = !title?.trim() || !content?.trim();

    return (
        <Dialog open={isModalOpen} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-150 p-0 border-none">
                <div className="p-4 border-b flex justify-between items-center">
                    <DialogTitle className="text-md font-semibold">Create Post</DialogTitle>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-3 mb-6">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.profileImage} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">Posting Publicly</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                            {/* Title Field with Border */}
                            <div className="border-b border-gray-300 pb-2">
                                <FormField control={form.control} name="title" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="What is your question?"
                                                className="border-none shadow-none text-xl font-semibold p-0 focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Content Field with Border */}
                            <div className="border-b border-gray-300 pb-2">
                                <FormField control={form.control} name="content" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Add Link or text"
                                                className="border-none shadow-none focus-visible:ring-0 p-0 min-h-25 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>

                            {/* Tags Field with Border */}
                            <div className="border-b border-gray-300 ">
                                <FormField control={form.control} name="tags" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Add Related Tags (comma separated)"
                                                className="border-none shadow-none focus-visible:ring-0 p-0 min-h-12"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>

                            <div className="py-2">
                                <ImagePreview file={imageFile} onRemove={() => form.setValue("questionImage", undefined)} />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <FormField control={form.control} name="questionImage" render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <TooltipProvider>
                                            <Tooltip delayDuration={300}>
                                                <TooltipTrigger asChild>
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="cursor-pointer hover:bg-accent p-2 rounded-full block transition-colors"
                                                    >
                                                        <ImagePlus className="h-6 w-6 text-muted-foreground" />
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => onChange(e.target.files)}
                                                            {...fieldProps}
                                                        />
                                                    </label>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" className="bg-black/90 text-white border-white/10 backdrop-blur-md">
                                                    <p>Attach media</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </FormItem>
                                )} />

                                <div className="flex gap-2">
                                    <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
                                    <Button
                                        type="submit"
                                        className="rounded-full px-6"
                                        disabled={isInvalid || form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? "Posting..." : "Add question"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}