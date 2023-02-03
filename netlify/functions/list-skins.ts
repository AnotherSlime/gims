import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

const notString = (val: any) => !(typeof val === "string" && val);

const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {
    try {
        const mainPage = await axios.get("https://www.gimkit.com/");
        const mainHtml = mainPage?.data;
        if (notString(mainHtml)) throw new Error("main html is not string");
        const jsPath = mainHtml.match(
            /<script type="module" src="(\/index\..*?\.js)"><\/script>/
        )?.[1];
        if (notString(jsPath))
            throw new Error("could not find js path in main html");
        const mainJsPage = await axios.get("https://www.gimkit.com/" + jsPath);
        const mainJs = mainJsPage?.data;
        if (notString(mainJs)) throw new Error("main js is not string");
        const skinsObj = mainJs.match(
            /{(?:default\w+?:(\w+?)\("\w+?"\))(?:,\w+?:\1\("\w+?"\))+?}/i
        )?.[0];
        if (notString(skinsObj))
            throw new Error("could not find skins object in main js");
        const skinsArr = skinsObj.match(/(?<=\w+?:\w+?\(")\w+?(?="\))/g);
        if (
            !(
                typeof skinsArr === "object" &&
                Array.isArray(skinsArr) &&
                skinsArr.length > 0
            )
        )
            throw new Error("could not find skins array in main js");

        return {
            statusCode: 200,
            body: JSON.stringify(skinsArr.reverse()),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: "Internal Server Error",
        };
    }
};

export { handler };
