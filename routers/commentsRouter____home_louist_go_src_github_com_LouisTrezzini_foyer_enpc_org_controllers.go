package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"] = append(beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"] = append(beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"],
		beego.ControllerComments{
			Method: "Get",
			Router: `/:userId`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"] = append(beego.GlobalControllerRouter["github.com/LouisTrezzini/foyer.enpc.org/controllers:AccountController"],
		beego.ControllerComments{
			Method: "BuyDrink",
			Router: `/:userId/buy-drink/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

}
