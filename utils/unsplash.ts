import request from "./request";

const accessKey = 'ojVs6ZS4BcgC7LbPT6Ct9do4nehKcQod9nass6xmDQc';

export default class unsplash {
    private pics: Array<object> = [];
    private currentIndex: number = 0;
    private requestIndex:number=1;

     constructor() {
         this.reFreshData()
    }

   async checkPics() {
        if (this.currentIndex > (this.pics.length - 4)) {
            await this.reFreshData()
        }
    }

    async reFreshData() {
        const res:any = await request({
            url: `https://api.unsplash.com/photos/random?query=night&count=10&client_id=${accessKey}`,
            method: 'get'
        })
        this.requestIndex++;
        const newPics = res.map((photo: any) => {
            return photo.urls.regular;
        })
        this.pics = [...this.pics, ...newPics];
        console.log(this.pics.join('\n'))
    }

    async change() {
        console.log('当前图片索引', this.currentIndex)
        console.log('当前图片池大小：', this.pics.length)
        this.currentIndex++;
        await this.checkPics()
        return this.pics[this.currentIndex]
    }


}
