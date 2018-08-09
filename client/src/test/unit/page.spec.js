/**
 * Created by host on 2017/5/11.
 */
import Vue from "vue";
import page from "../../component/page.vue";
let pagePros=function(component,propsData){
    let ctor=Vue.extend(component);
    let vm=new ctor({propsData}).$mount();
    return vm;

};
function dd(val){
    return val;
}
describe("test page vue",()=>{

     it("page vue",()=>{
        let vmPage=pagePros(page,{
            cur:1,
            all:40,
            call:function(data){
                console.log(data);
            }
        });
         let arr=[1,2,3,4,5,6,7,8,9,10];
         expect(vmPage.indexs).toEqual(arr);
         expect(vmPage.cur).toEqual(1);
         vmPage.next_page();
         expect(vmPage.indexs).toEqual(arr);
         expect(vmPage.cur).toEqual(2);
         vmPage.pre_page();
         expect(vmPage.cur).toBe(1);
         const $li=vmPage.$el.querySelectorAll("li")[2];
         const btn=$li.querySelector('a');
         const clickEvent=new window.Event('click');
       /*  it("if click btn show the right page",()=>{*/
            btn.dispatchEvent(clickEvent);
         vmPage._watcher.run();
             expect(btn.innerHTML).toContain(vmPage.cur);
        // });
         //测试点击
     });
    it("the second page",()=>{
        let vm2=pagePros(page,{
            cur:10,
            all:40,
            call:function(data){
                console.log(data);
            }
        });
        let arr=[5,6,7,8,9,10,11,12,13,14];
        expect(vm2.indexs).toEqual(arr);
        expect(vm2.cur).toBe(10);
    });
    it("the third page",()=>{
        let vm2=pagePros(page,{
            cur:38,
            all:40,
            call:function(data){
                console.log(data);
            }
        });
        let arr=[31,32,33,34,35,36,37,38,39,40];
        expect(vm2.indexs).toEqual(arr);
        expect(vm2.cur).toBe(38);
    })
});