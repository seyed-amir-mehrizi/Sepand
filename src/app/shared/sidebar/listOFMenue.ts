


export function getListOfMenu(){
    return [
        {
            headerName : "خانه" , 
            headerIcon : "fa fa-home mx-2",
            hiddenProperty:false,

            children:[
                {
                    name:"داشبورد",
                    routerLink:"/main/mainPage"
                }
            ]
        },
        {
            headerName : "کاربران" , 
            headerIcon : "fa fa-user mx-2",
            hiddenProperty:false,

            children:[
                {
                    name:"لیست کاربران",
                    routerLink:"/main/userList"
                }
            ]
        },
        {
            headerName : "مدیریت درخواست ها" , 
            headerIcon : "fa fa-barcode mx-2",
            hiddenProperty:false,

            children:[
                {
                    name:"ثبت مشتری",
                    routerLink:"/main/requestManagement/registerCustomer"
                },
                {
                    name:"مشتریان",
                    routerLink:"/main/requestManagement/customersList"
                },
                {
                    name:"تغییر شماره شبا",
                    routerLink:"/main/requestManagement/changheIban"
                },
                {
                    name:"تغییر صنف",
                    routerLink:"/main/requestManagement/changeClass"
                },               {
                    name:"تغییر کد پستی",
                    routerLink:"/main/requestManagement/changePostalcode"
                },
                {
                    name:"ابطال ترمینال",
                    routerLink:"/main/requestManagement/removeTerminal"
                },               {
                    name:"فعال کردن ترمینال",
                    routerLink:"/main/requestManagement/activateTerminal"
                },
                {
                    name:"درخواست ها",
                    routerLink:"/main/requestManagement/requests"
                },
                {
                    name:"مدارک ارسالی",
                    routerLink:"/main/requestManagement/sendingDocuments"
                },
            ]
        },
        {
            headerName : "اطلاعات پایه" , 
            headerIcon : "fa fa-dashboard mx-2",
            hiddenProperty:true,
            children:[
                {
                    name:"ثبت اطلاعات پروژه",
                    routerLink:"/main/basicInfo/registerProject"
                },
                {
                    name:"لیست پروژه ها",
                    routerLink:"/main/basicInfo/ProjectList"
                },
                {
                    name:"ثبت اطلاعات شرکت پرداخت",
                    routerLink:"/main/basicInfo/PspAdd"
                },
                {
                    name:"لیست شرکت پرداخت",
                    routerLink:"/main/basicInfo/PspList"
                }
            ]
        }

    ]
}