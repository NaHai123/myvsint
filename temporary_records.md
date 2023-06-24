# 1 自动生成轮播列表，取过去一整天的24个时间点
let d=new Date()
var temp = [    '0000','0100','0200','0300','0400','0500',
                '0600','0700','0800','0900','1000','1100',
                '1200','1300','1400','1500','1600','1700',
                '1800','1900','2000','2100','2200','2300']
var month = d.getMonth()+1
var a = d.getFullYear().toString()+("0" + month).slice(-2).toString()+("0" + (parseInt(d.getDate())-1).toString()).slice(-2).toString()
var period = []
var predictPeriod = []
for (let c = 0; c < temp.length; c++)
     {
     period.push(a+temp[c])
     predictPeriod.push((a+temp[c]).slice(0,-2)+'50')
     }
console.log(period)
console.log(predictPeriod)
