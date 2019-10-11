import * as fs from 'fs';

import { ModuleCollection } from '../Structures/Interfaces/Modules';

export function InitializeModules(): ModuleCollection {
    const col: ModuleCollection = { modules: [] };

    fs.readdir('../Modules/', (err, files: string[]) => {
        files.forEach(async (filename: string) => {
            col.modules.push(await import(filename.split('.')[0]));
        });
    });

    return col;
}