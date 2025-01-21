import React, { useContext } from "react";
import { useParams} from "react-router-dom";
import { TodoContext } from "../TodoContext";


const WebViewer = () => {
    const { site } = useParams();

    const { Lists, setLists } = useContext(TodoContext)

    // {Lists.map((site)=>{
    //     const websiteMap = site.name;
    //     const WebsiteUrl = site.SiteUrl;
    // })}

    const website = Lists.find((item) => item.name.toLowerCase() === site.toLowerCase());

    if (!website) {
        // If no matching site is found
        return <p className="p-4">Website not found</p>;
    }

    return (
        <div className="h-[99vh]">
            <iframe
                src={website.SiteUrl}
                className="w-full h-full border-none"
                title={website.name}
            />
        </div>
    );


}
export default WebViewer;
