
"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CustomUserAvatar from './user-avatar'
import { ImagePlus } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { usePostForm } from "@/lib/post-form-modal";
import { ImagePreview } from "./image-preview";
import { TooltipWrapper } from "./tool-tip-wrapper";
import { TiptapEditor } from "./tiptap-editor";

export default function PostFormModal() {
    const { isModalOpen } = useModalStore();
    const { form, onSubmit, handleCancel, user } = usePostForm();

    const currentFiles: File[] = form.watch("questionImage") || [];

    const title = form.watch("title");
    const content = form.watch("content");
    const isInvalid = !title?.trim() || !content?.trim();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const totalFiles = [...currentFiles, ...selectedFiles];

        if (totalFiles.length > 4) {
            form.setError("questionImage", {
                type: "manual",
                message: "Maximum 4 images allowed."
            });
            return;
        }
        form.clearErrors("questionImage");
        form.setValue("questionImage", totalFiles);
    };

    const removeImage = (index: number) => {
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        form.setValue("questionImage", updatedFiles);
        if (updatedFiles.length <= 4) form.clearErrors("questionImage");
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-150 p-0 border-none max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center shrink-0">
                    <DialogTitle className="text-md font-semibold">Create Post</DialogTitle>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                    <div className="flex items-center gap-3 mb-6">
                        <CustomUserAvatar src={user?.profileImage} name={user?.name} size="md" />
                        <div>
                            <p className="text-sm font-bold">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">Posting Publicly</p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                            <div>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <TiptapEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Add Description, links, or any additional context..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="border-b border-gray-300 pb-2">
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

                            <div className="">
                                <ImagePreview files={currentFiles} onRemove={removeImage} />
                                {/* Error Message for > 4 images */}
                                {form.formState.errors.questionImage && (
                                    <p className="text-sm text-destructive font-medium mt-2 bg-destructive/10 p-2 rounded-md">
                                        {String(form?.formState?.errors?.questionImage?.message) || "Something went wrong!"}
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="p-4 border-t flex items-center justify-between shrink-0">
                    <FormField control={form.control} name="questionImage" render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <TooltipWrapper content="Attach media (Max 4)" side="bottom">
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
                                        multiple // Enable multiple selection
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </TooltipWrapper>
                        </FormItem>
                    )} />

                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
                        <Button
                            type="submit"
                            className="rounded-full px-6"
                            // Disable if invalid, submitting, or too many images
                            disabled={isInvalid || form.formState.isSubmitting || currentFiles.length > 4}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {form.formState.isSubmitting ? "Posting..." : "Add question"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}