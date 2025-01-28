import * as React from "react";
import InputError from "@/components/InputError";
import { Input } from "@/components/ui/input";

export function ImagesForm(props: {
    data: any;
    errors: any;
    setData: Function;
}) {
    const [images, setImages] = React.useState<string[]>(props.data.images);
    const [sponsorImages, setSponsorImages] = React.useState<string[]>([
        props.data.sponsor_image,
    ]);

    function handleUploadImages(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file, index) => {
                const fileName = "img_" + index;
                const url = URL.createObjectURL(file);
                return { url, fileName };
            });
            const savedImages = imageUrls.map((image) => image.url);
            setImages(savedImages);
            props.setData("images", savedImages);
        }
    }

    function handleUploadSponsorImages(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file, index) => {
                const fileName = "sponsor_img_" + index;
                const url = URL.createObjectURL(file);
                return { url, fileName };
            });
            const savedImages = imageUrls.map((image) => image.url);
            setSponsorImages(savedImages);
            props.setData("sponsor_image", savedImages);
        }
    }

    return (
        <>
            <div className="py-8 mb-2">
                <div className="mb-2 space-y-2">
                    <h1 className="text-xl font-semibold">
                        Fotos da Quadra (opcional)
                    </h1>
                    <p className="text-gray-600">
                        Clique no botão abaixo para carregar as fotos da quadra.
                    </p>
                </div>
                <div>
                    <InputError message={props.errors.images} />
                    <div className="max-w-sm mb-4">
                        <Input
                            id="picture"
                            type="file"
                            onChange={handleUploadImages}
                            multiple
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
                </div>
            </div>
            <div className="py-8">
                <div className="mb-2 space-y-2">
                    <h1 className="text-xl font-semibold">
                        Logo da Quadra / Patrocinador (opcional)
                    </h1>
                    <p className="text-gray-600">
                        Clique no botão abaixo para carregar as fotos de
                        patrocinador da quadra.
                    </p>
                </div>
                <div>
                    <InputError message={props.errors.sponsor_image} />
                    <div className="max-w-sm mb-4">
                        <Input
                            id="picture"
                            type="file"
                            onChange={handleUploadSponsorImages}
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {sponsorImages.length > 0 && sponsorImages.map((image_src, index) => (
                            <div key={index} className="relative">
                                <img
                                    className="h-36 w-full rounded-lg"
                                    src={image_src}
                                    alt={"img-" + index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
