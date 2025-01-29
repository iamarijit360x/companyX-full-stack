import { apiFile } from '@/api/fileAPI';
import axios from 'axios';

export const uploadPdf = async (file: File) => {
    try {

        const response = await axios.post(apiFile, {pdf:file}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading PDF:', error);
        throw error;
    }
};
export const downloadPdf = async (fileId: string) => {
    try {
        const response = await axios.get(`${apiFile}/${fileId}`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
};
