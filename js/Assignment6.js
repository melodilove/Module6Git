function MenuChoice()
{
    if (document.getElementById("menu").value == "Add Customer")
    {
        document.getElementById("addcust").style.visibility = "visible";
        document.getElementById("changecustomer").style.visibility = "hidden";
        document.getElementById("deletecustomer").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Update Shipping Address")
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("changecustomer").style.visibility = "visible";
        document.getElementById("deletecustomer").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Customer")
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("changecustomer").style.visibility = "hidden";
        document.getElementById("deletecustomer").style.visibility = "visible";
    }
    else
   {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("changecustomer").style.visibility = "hidden";
        document.getElementById("deletecustomer").style.visibility = "hidden";
   }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var custid = document.getElementById("customerid").value;
    var custname = document.getElementById("customername").value;
    var custcity = document.getElementById("customercity").value;
    
    var newcustomer = '{"CustomerID":"' + custid + '","CompanyName":"' + custname +'","City":"' + custcity +'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
        var result = JSON.parse(objRequest.responseText);
        OperationResult(result);
        }
    }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("display").innerHTML = "The customer was added."
    }
    else
    {
        document.getElementById("display").innerHTML = "The customer could not be added." + "<br>" + output.Exception;
    }
}

function UpdateAddress()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var ordernum = document.getElementById("ordernumber").value;
    var shipname = document.getElementById("shipname").value;
    var shipstreet = document.getElementById("shipstreet").value;
    var shipcity = document.getElementById("shipcity").value;
    var shippostal = document.getElementById("shippostalcode").value;
    
    var newaddress = '{"OrderID":"' + ordernum + '","ShipName":"' + shipname +'","ShipAddress":"' + shipstreet +'","ShipCity":"' + shipcity +'","ShipPostcode":"' + shippostal + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            ChangeResult(result);
        }
    }

    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newaddress);
}

function ChangeResult(output)
{
    if (output == 1)
    {
        document.getElementById("result").innerHTML = "The shipping address was updated."
    }
    else if (output == -1)
    {
        document.getElementById("result").innerHTML = "The shipping address could not be updated due to an unspecified error." + "<br>" + output.Exception;
    }
    else if (output == -2)
    {
        document.getElementById("result").innerHTML = "The shipping address could not be updated because the data string supplied could not be deserialized into the service object." + "<br>" + output.Exception;
    }
    else 
    {
        document.getElementById("result").innerHTML = "The shipping address could not be updated because a record with supplied Order ID could not be found." + "<br>" + output.Exception;
    }
}

function ConfirmDelete()
{
    var msg;
    msg= "Are you sure you want to delete the data ?";
    var agree=confirm(msg);
    if (agree)
    {
        DeleteCustomer() ;
    }
}

function DeleteCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("cid").value;

    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            DeleteResult(result);
        }
    }
    objRequest.open("GET",url,true);
    objRequest.send();
}
   
function DeleteResult(output)
{
    if (output.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("delresult").innerHTML = "The customer has been deleted."
    }
    else
    {
        document.getElementById("delresult").innerHTML = "The customer could not be deleted." + "<br>" + output.Exception;
    }
}
