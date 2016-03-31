﻿/*
 *
 * (c) Copyright Ascensio System Limited 2010-2016
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/

var language;
var userid;
var firstname;
var lastname;

if (typeof jQuery != "undefined") {
    jq = jQuery.noConflict();

    firstname = getUrlVars()["firstname"];
    lastname = getUrlVars()["lastname"];
    userid = getUrlVars()["userid"];
    language = getUrlVars()["lang"];

    if ("" != language && undefined != language)
        jq("#language").val(language);
    else
        language = jq("#language").val();


    jq("#language").change(function() {
        var user = jq('#user option:selected').text();
        var arUser = user.split(' ');
        firstname = arUser[0];
        //alert(language);
        lastname = arUser[1];
        window.location = "?lang=" + jq(this).val() + "&userid=" + userid + "&firstname=" + firstname + "&lastname=" + lastname;
    });
    

    if ("" != userid && undefined != userid)
        jq("#user").val(userid);
    else
        userid = jq("#user").val();

    if ("" != firstname && undefined != firstname)
        firstname=getUrlVars()["firstname"];
    else{
        var user = jq('#user option:selected').text();
        var arUser = user.split(' ');
        firstname = arUser[0];
    }
    if ("" != lastname && undefined != lastname)
        lastname=getUrlVars()["lastname"];
    else{
        var user = jq('#user option:selected').text();
        var arUser = user.split(' ');
        lastname = arUser[1];
    }

    jq("#user").change(function() {
        var user = jq('#user option:selected').text();
        var arUser = user.split(' ');
        firstname = arUser[0];
        lastname = arUser[1];
        
//var fn = jq('#user option:selected').attr('value-fn');
        window.location = "?lang=" + language + "&userid=" + jq(this).val() + "&firstname=" + arUser[0] + "&lastname=" + arUser[1];
    });

    jq(function () {
        jq('#fileupload').fileupload({
            dataType: 'json',
            add: function (e, data) {                
                data.submit();
				setTimeout(function () { document.location.reload(); }, 1000);
            }
        });
    });
    
    var timer = null;
	
	jq(document).on("click", "#beginEdit:not(.disable)", function () {
        var fileId = encodeURIComponent(jq('#hiddenFileName').val());
        var url = UrlEditor + "?fileName=" + fileId + "&lang=" + language + "&userid=" + userid + "&firstname=" +firstname +"&lastname=" + lastname;
        window.open(url, "_blank");
        jq('#hiddenFileName').val("");
        jq.unblockUI();
        document.location.reload();
    });

    jq(document).on("click", "#beginView:not(.disable)", function () {
        var fileId = encodeURIComponent(jq('#hiddenFileName').val());
        var url = UrlEditor + "?mode=view&fileName=" + fileId + "&lang=" + language + "&userid=" + userid + "&firstname=" +firstname +"&lastname=" + lastname;
        window.open(url, "_blank");
        jq('#hiddenFileName').val("");
        jq.unblockUI();
        document.location.reload();
    });

    jq(document).on("click", "#beginEmbedded:not(.disable)", function () {
        var fileId = encodeURIComponent(jq('#hiddenFileName').val());
        var url = UrlEditor + "?mode=embedded&fileName=" + fileId + "&lang=" + language + "&userid=" + userid + "&firstname=" +firstname +"&lastname=" + lastname;

        jq("#mainProgress").addClass("embedded");
        jq("#beginEmbedded").addClass("disable");

        jq("#embeddedView").attr("src", url);
    });

    jq(document).on("click", ".reload-page", function () {
        setTimeout(function () { document.location.reload(); }, 1000);
        return true;
    });

    jq(document).on("mouseup", ".reload-page", function (event) {
        if (event.which == 2) {
            setTimeout(function () { document.location.reload(); }, 1000);
        }
        return true;
    });

    jq(document).on("click", "#cancelEdit, .dialog-close", function () {
        jq('#hiddenFileName').val("");
        jq("#embeddedView").attr("src", "");
        jq.unblockUI();
    });

    jq(document).on("click", ".delete-file", function () {
        var fileName = jq(this).attr("data");

        var requestAddress = "file?filename=" + fileName;

        jq.ajax({
            async: true,
            contentType: "text/xml",
            type: "delete",
            url: requestAddress,
            complete: function (data) {
                document.location.reload();
            }
        });
    });

    jq.dropdownToggle({
        switcherSelector: ".question",
        dropdownID: "hint"
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};