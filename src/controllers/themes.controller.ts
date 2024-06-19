import fs from 'fs';
import express, {Router, Request, Response} from 'express';
import {App} from '../index'
import path from 'path'

export default {
    theme: 'default',
    state: 'completed',
    removeDir(){
        fs.rmdir('/dist', (err)=>{

        })
    }, 
    makeDir(){
        fs.mkdir('/dist', (err)=>{

        })
    },
    prepJs(){
        const filePath = "/" + this.theme;
        const js = fs.readFileSync(filePath + '/bundle.js', 'utf8');
        fs.readFile(filePath + '/bundle.js', 'utf8', (err, data) => {
            if (err) return;
            const prependString = `window.onload(function(){
                const themeConfig = ${config.themeConfig}`,
                appendString = `});`
            const newData = prependString + data + appendString;
            fs.writeFile(filePath + '/bundle.js', newData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Successfully prepended data to the file!');
            })
        });
    },
    serverlessProvider(){
        //if(this.state != 'loaded') return;
        config.functions.forEach(
            (func:Function)=>{
                App.get(
                    '/api/' + func.name,
                    (req: Request, res: Response) => {
                        func(req, res);
                    }
                )
            }
        )

        
    },
    load(theme='default'){
        this.theme = theme;
        //this.state = 'loaded';
        const config = JSON.parse(fs.readFileSync("/" + this.theme + 'config.json', 'utf8'));
        this.state ='loading';
        this.removeDir();
        this.makeDir();
        this.prepJs();
        this.serverlessProvider();
        App.use(express.static(path.join(__dirname, '/dist')));
        App.get('/app', (res: Response, req: Request)=>{
            res.sendFile('index.html', { root: '/dist' });
        })
        this.state = 'completed'
    },
    unload(){
        if(this.state !== 'completed') return;
        this.state = 'loading'
        this.load();
        this.theme = 'default'
        this.state = 'complete'
    }
}