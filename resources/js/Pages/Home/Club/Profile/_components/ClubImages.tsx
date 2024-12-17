import { Input } from "@/components/ui/input";
import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function ClubImages(props: { setImages: (urls: string[]) => void, images: string[]}) {
    const [images, setImages] = React.useState<string[]>(props.images);
    const [mainImage, setMainImage] = React.useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setImages(imageUrls);
            props.setImages(imageUrls);
        }
    };

    const handleSetMainImage = (image: string) => {
        setMainImage(image);
    };

    const handleDragEnd = (result: any) => {
        const { destination, source } = result;
        if (!destination) return;

        const reorderedImages = Array.from(images);
        const [removed] = reorderedImages.splice(source.index, 1);
        reorderedImages.splice(destination.index, 0, removed);

        setImages(reorderedImages);
    };

    return (
        <>
            <div className="max-w-sm mb-4">
                <Input
                    id="picture"
                    type="file"
                    multiple
                    onChange={handleUpload}
                />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid gap-4">
                    <Droppable droppableId="images" direction="horizontal">
                        {(provided) => (
                            <div
                                className="grid grid-cols-5 gap-4"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {images.map((image_src, index) => (
                                    <Draggable
                                        key={index}
                                        draggableId={image_src}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="relative group"
                                            >
                                                <img
                                                    className={`h-36 w-full rounded-lg ${
                                                        mainImage === image_src
                                                            ? "border-4 border-yellow-500"
                                                            : ""
                                                    }`}
                                                    src={image_src}
                                                    alt={"img-" + index}
                                                />
                                                <button
                                                    className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() =>
                                                        handleSetMainImage(
                                                            image_src
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    {mainImage === image_src
                                                        ? "Principal"
                                                        : "Tornar Principal"}
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
}
