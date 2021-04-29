class RXResources {
    constructor() {
        if(!RXResources.instance){
            this.setDefault();
            RXResources.instance = this;
        }
        return RXResources.instance;
    }

    setDefault = () => {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    // Load an image url or an array of image urls
    load = urls => {
        urls = urls instanceof Array ? urls : [urls];
        urls.forEach(url => {
            if (this.resourceCache[url]) {
                return this.resourceCache[url];
            } else {
                const img = new Image();
                img.onload = () => {
                    this.resourceCache[url] = img;
                    
                    if (this.isReady()) {
                        this.loading.forEach(func => func());
                    }
                };
                this.resourceCache[url] = false;
                img.src = url;
            }

        });
    }

    get = url => this.resourceCache[url];

    isReady = () => {
        let ready = true;
        for(let k in this.resourceCache) {
            if(this.resourceCache.hasOwnProperty(k) &&
               !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    onReady = func => this.loading.push(func);
}

const resources = new RXResources();
Object.freeze(resources);
export default {
    load: resources.load,
    get: resources.get,
    onReady: resources.onReady,
    isReady: resources.isReady,
}