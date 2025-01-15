import { Input } from "@/components/ui/input";
import * as React from "react";

export function CourtImageSelector(props: {
    setImages: (urls: string[]) => void;
    images?: string[];
    saveAs?: string;
    multiple?: boolean;
}) {
    const [images, setImages] = React.useState<string[]>(props.images ?? []);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file, index) => {
                const fileName = props.saveAs ? props.saveAs : `img${index}`;
                const url = URL.createObjectURL(file);
                return { url, fileName };
            });
            const savedImages = imageUrls.map((image) => image.url);
            setImages(savedImages);
            props.setImages(savedImages);
        }
    };

    return (
        <>
            <div className="max-w-sm mb-4">
                <Input
                    id="picture"
                    type="file"
                    multiple={props.multiple}
                    onChange={handleUpload}
                />
            </div>
            <div className="grid grid-cols-5 gap-4">
                {images.map((image_src, index) => (
                    <div key={index} className="relative">
                        <img
                            className="h-36 w-full rounded-lg"
                            src={image_src}
                            alt={"img-" + index}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
