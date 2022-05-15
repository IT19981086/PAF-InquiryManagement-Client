
var token = "dfbdkGHDTFDFTHbjbjhDTFghghjDjGUHuyhfGDYggjctfSRdtyHIGitr5dugkhIJGtysdNjbGFRSFGVHIKBHBJGFXDTAWawseweqwqWERDDFGCJHYNTk3NjIwMTB9.oXHw-S4fPdJHKUYGwCFHjkHDFRSWNJILGdXYRyb3lGyjkqNGxIMusdPPPOi00v6Jtf7axkqfnF3rjkHWzwIbXg";

function getDetails(){
	jQuery.ajax({
        url: "http://localhost:8080/inquiry_war_exploded/inquiry",
        type: "GET",
        contentType: "application/json", 
        headers: {"Authorization": "Bearer " + token},        
        dataType:'json',
        success: function(data, textStatus, errorThrown) {
            
        	var items = [];
        	
        	$.each(data, function(key, val){
        		items.push("<tr>");
        		items.push("<td>" + val.inquiryId + "</td>");
                items.push("<td>" + val.inquiryTitle + "</td>");
        		items.push("<td>" + val.inquiryType + "</td>");
        		items.push("<td>" + val.inquiryDate + "</td>");
        		items.push("<tr>");
        	});
        	$("<tbody/>", {html: items.join("")}).appendTo("#all_inquirys");

        }, 
        error : function(jqXHR, textStatus, errorThrown) {
        		$("#inquiry_id").text("Sorry! Inquiry not found!");
        		$("#inquiry_title").text("");
        },
        timeout: 120000,
    });
};

function getDetailsById(){
	jQuery.ajax({
        url: "http://localhost:8080/inquiry_war_exploded/inquiry/" + parseInt($("#inquiry_id").val()),
        type: "GET",
        contentType: "application/json", 
        headers: {"Authorization": "Bearer " + token},        
        dataType:'json',
        success: function(data, textStatus, errorThrown) {
            
        	var items = [];
        	
        	
        		items.push("<tr>");
        		items.push("<td>" + data.inquiryId + "</td>");
        		items.push("<td>" + data.inquiryTitle + "</td>");
        		items.push("<td>" + data.inquiryType  + "</td>");
        		items.push("<td>" + data.inquiryDate + "</td>");
        		items.push("<tr>");
        	
        	$("<tbody/>", {html: items.join("")}).appendTo("#one_inquiry");

        }, 
        error : function(jqXHR, textStatus, errorThrown) {
        		$("#error_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Inquiry Not Found!</div>");
        		$("#inquiry_title").text("");
        },
        timeout: 120000,
    });
};

function addInquirys(){
	console.log('addWine');
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + token},
        url: "http://localhost:8080/inquiry_war_exploded/inquiry",
        dataType: "json",
        data: AddNewInquiryformToJSON(),
        success: function(response){
        	$("#pro_add_msg").html("<div class=\"alert alert-success\" role=\"alert\">Inquiry added successfuly!</div>");
        },
        error: function(jqXHR, textStatus, errorThrown){
        	$("#pro_add_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Something went wrong!</div>");
        }
    });
};

function removeInquiryById(){
	jQuery.ajax({
        url: "http://localhost:8080/inquiry_war_exploded/inquiry/" + $("#del_inquiry_id").val(),
        type: "DELETE",
        contentType: "application/json",  
        dataType:'json',
        headers: {"Authorization": "Bearer " + token},
        success: function(data, textStatus, errorThrown) {
        	$("#pro_del_msg").html("<div class=\"alert alert-success\" role=\"alert\">Inquiry deleted successfuly!</div>");
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	$("#pro_del_msg").html("<div class=\"alert alert-danger\" role=\"alert\">Something went wrong!</div>");
        },
        timeout: 120000,
    });
};


function AddNewInquiryformToJSON() {
    return JSON.stringify({
        "inquiryId" : $('#inquiry_id').val(),
        "inquiryTitle" : $('#inquiry_title').val(),
        "inquiryType": $('#inquiry_type').val(),
        "inquiryDate" : $('#date').val(),
       
        
    });
}