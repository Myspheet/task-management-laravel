import axios from "axios";
import { pdfDownloader } from "../helper/downloader";
import { FaDownload } from "react-icons/fa6";
import { useSelector } from "react-redux";

const DownloadTasksBtn = () => {
    const user = useSelector((state) => state.user.user);
    const downloadTaskList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/download/tasks",
                {
                    responseType: "blob",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            pdfDownloader(response.data, user.name);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={downloadTaskList}
                className="btn btn-primary w-full"
            >
                Download Pdf of Task List <FaDownload />{" "}
            </button>
        </div>
    );
};

export default DownloadTasksBtn;
