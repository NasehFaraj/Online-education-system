import fs from "fs";
import path from "path";


const processDir = (dir: string) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir , file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            content = content.replace(
                /(from\s+["'])(\.?\.?\/[^"']+)(["'])/g,
                (match, p1, p2, p3) => `${p1}${p2}.js${p3}`
            );

            fs.writeFileSync(fullPath, content);
        }
    });
};

processDir('./dist') ;