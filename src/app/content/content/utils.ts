import fs from "fs";
import path from "path";
import matter from "gray-matter";

//red the mdx file
function getMDXFiles(dir:string){
    return fs.readdirSync(dir).filter((file)=>path.extname(file) === '.mdx');
}


//read data from those mdx files
function readMdxFiles(filepath: fs.PathOrFileDescriptor){
    let rawContent= fs.readFileSync(filepath,"utf-8");
    return matter(rawContent);
}

//present the mdx data
function getMdxData(dir:string) {
    let mdxFiles = getMDXFiles(dir);

    return mdxFiles.map((file) => {
        let { data, content } = readMdxFiles(path.join(dir, file)); // Assuming readMdxFile is defined
        let slug = path.basename(file, path.extname(file));

        return {
            metadata: data, // Corrected from metadata to data
            slug,
            content,
        };
    });
}

export function getBlogposts(){
    return getMdxData(path.join(process.cwd(),"src","app","content","content"));
}

export function formatDate(date: string, includeRelative = false) {
    let currentDate = new Date();

    if (!date.includes('T')) {
        date = `${date}T00:00:00`;
    }

    let targetDate = new Date(date);

    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    let daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = "";

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y Ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}m Ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d Ago`;
    } else {
        formattedDate = "Today";
    }

    let fullDate = targetDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}
