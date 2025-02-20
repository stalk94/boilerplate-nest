import React from 'react';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';

type UploadOptions = {
    url: string
    key?: string
    onProgress?: (progress: number)=> void
    onSuccess?: (data: any)=> void
    onError?: (error: any)=> void
}
type UploadOptionsArray = {
    url: string
    key?: string
    onProgress?: (progress: number, file: File)=> void
    onSuccess?: (data: any, file: File)=> void
    onError?: (error: any, file: File)=> void
}


/** hook универсальный загрузчик */ 
export const useUpload =(isMulti: boolean)=> {
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [progressMap, setProgressMap] = React.useState<Record<string, number>>({});


    const uploadFile = async (file: File | FileList, options: UploadOptions)=> {
        if(!options.url) throw new Error("Не указан URL для загрузки");

        const formData = new FormData();
        setLoading(true);
        setProgress(0);
        
        if(file instanceof FileList) {
            Array.from(file).forEach((f)=> formData.append("files", f));
        } 
        else formData.append("file", file);
        
        if(options.key) formData.append("fileName", options.key);
        

        try {
            const response = await axios.post(options.url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (event)=> {
                    const percent = Math.round((event.loaded * 100) / (event.total || 1));
                    setProgress(percent);
                    options.onProgress?.(percent);
                },
            });

            options.onSuccess?.(response.data);
        } 
        catch(error) {
            options.onError?.(error);
        } 
        finally {
            setLoading(false);
            setProgress(0);
        }
    }
    const uploadFiles = async (files: File | FileList, options: UploadOptionsArray) => {
        if(!options.url) throw new Error("Не указан URL для загрузки");

        setLoading(true);

        const fileArray = files instanceof FileList ? Array.from(files) : [files];
        const newProgressMap: Record<string, number> = {};

        for(const file of fileArray) {
            const formData = new FormData();
            formData.append("file", file);

            if(options.key) {
                formData.append("fileName", options.key);
            }

            try {
                const response = await axios.post(options.url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (event)=> {
                        const percent = Math.round((event.loaded * 100) / (event.total || 1));
                        newProgressMap[file.name] = percent;
                        setProgressMap({ ...newProgressMap });
                        options.onProgress?.(percent, file);
                    }
                });

                options.onSuccess?.(response.data, file);
            } 
            catch(error) {
                options.onError?.(error, file);
            }
        }

        setLoading(false);
    }


    if(isMulti) return { uploadFiles, loading, progressMap };
    else return { uploadFile, loading, progress };
}

//todo: надо простилизировать и проработать
export function FileLoader({ label, path }: { label:string, path?:string }) { 
    const { uploadFile, loading, progress } = useUpload(false);
    const [fileName, setFileName] = React.useState<string | null>();


    const handleUpload =(event: React.ChangeEvent<HTMLInputElement>)=> {
        const files = event.target.files;

        if(files) {
            setFileName(files[0].name);

            uploadFile(files[0], {
                url: gurl + 'upload/' + (path ?? 'one'),
                key: label,
                onProgress: (p)=> console.log(`Загрузка: ${p}%`),
                onSuccess: (data)=> console.log("Файл загружен:", data),
                onError: (err)=> console.error("Ошибка загрузки", err),
            });
        }
    }

    
    return (
        <div className="flex flex-col items-center p-4 rounded-2xl max-w-sm mx-auto">
            { loading &&
                <div className="text-gray-400 text-sm mt-2">
                    { progress }% load...
                </div>
                }
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                <input
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={loading}
                />
                { loading ? (
                    <React.Fragment>
                        { fileName && 
                            <div className="text-gray-700 text-sm">
                                📂 { fileName }
                            </div>
                        }
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"/>
                    </React.Fragment>
                ) : (
                    "Выбрать файл"
                )}
            </label>
        </div>
    );
}

export const FileLoaderPrime =()=> {

    return(
        <div>

        </div>
    );
}