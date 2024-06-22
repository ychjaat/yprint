
// var spa_report_setting = window.spa_report_setting;

// // console.log("Getting SPA Report Setting")

// const create_word_btn = async function () {
//     if (!spa_report_setting) {
//         let spa_report_settings = await frappe.db.get_doc("SPA Report Setting");
//         console.log(spa_report_settings)
//         spa_report_setting = spa_report_settings.enable_for
//     }
//     spa_report_setting.forEach(frm_ => {
//         frappe.ui.form.on(frm_.document, {
//             onload: function (frm) {
//                 if (frm.is_new()) {
//                     frm.set_value('spa_report_pdf', '');
//                 }
//             },
//             refresh: async (frm) => {

//                 if (frm_.enabled) {

//                     var t_filters;

//                     if (frm_.condition) {
//                         const formulaFunction = new Function('params', frm_.condition);
//                         t_filters = formulaFunction();
//                     } else {
//                         t_filters = {
//                             "document_type": frm.doc.doctype
//                         };
//                     }

//                     if (frm_.disable_standard_print) {
//                         $('[data-original-title="Print"]').hide();
//                         $('span.menu-item-label[data-label="Print"]').closest('li').hide();
//                     }

//                     var template = "Docx Template"

//                     if (frm_.is_jinja_template == 1) {
//                         template = "Print Format"
//                     }

//                     if (frm.doc.docstatus != 1) {
//                         // console.log("Sanjiv")
//                         if (frm_.is_jinja_template == 0) {
//                             frm.add_custom_button('Docx Preview', async () => {
//                                 let doctype = frm.doctype;
//                                 let doc_name = frm.doc.name;
//                                 if (frm_.allow_only_default) {
//                                     var api_url;
//                                     api_url = `/api/method/spa_report.api.docx_api.get_docx?doctype=${doctype}&name=${doc_name}&template=${frm_.default_template}`;
                                    
                                    
//                                     await download_file(api_url)
//                                 } else {
//                                     const dialoge_ = new frappe.ui.Dialog({
//                                         title: 'Select Docx Template',
//                                         fields: [
//                                             {
//                                                 fieldtype: "Link",
//                                                 fieldname: "docx_template",
//                                                 options: "Docx Template",
//                                                 label: "Template",
//                                                 reqd: 1,
//                                                 get_query: () => {
//                                                     return {
//                                                         filters: t_filters
//                                                     };
//                                                 },
//                                             }
//                                         ],
//                                         size: 'small', // small, large, extra-large 
//                                         primary_action_label: 'Download',
//                                         async primary_action(values) {
//                                             dialoge_.hide();
//                                             let api_url = `/api/method/spa_report.api.docx_api.get_docx?doctype=${doctype}&name=${doc_name}&template=${values.docx_template}`;
//                                             await download_file(api_url)
//                                         }
//                                     });
//                                     dialoge_.show();
//                                 }

//                             }, __("Report"))
//                         }

//                         frm.add_custom_button('Pdf Preview', async () => {

//                             if (frm_.allow_only_default) {
//                                 if(frm_.is_jinja_template==1){
//                                     download_pdf(frm.doctype, frm.doc.name, frm_.print_template, frm_.letterhead, frm_.is_jinja_template);
//                                 }else{
//                                     download_pdf(frm.doctype, frm.doc.name, frm_.default_template_template, frm_.letterhead, frm_.is_jinja_template);
//                                 }
                                
//                             } else {
//                                 const dialoge_ = new frappe.ui.Dialog({
//                                     title: 'Select Docx Template',
//                                     fields: [
//                                         {
//                                             fieldtype: "Link",
//                                             fieldname: "docx_template",
//                                             options: template,
//                                             label: "Template",
//                                             reqd: 1,
//                                             get_query: () => {
//                                                 return {
//                                                     filters: t_filters
//                                                 };
//                                             },
//                                         }
//                                     ],
//                                     size: 'small', // small, large, extra-large 
//                                     primary_action_label: 'Download',
//                                     async primary_action(values) {
//                                         dialoge_.hide();
//                                         await download_pdf(frm.doctype, frm.doc.name, values.docx_template, frm_.letterhead, frm_.is_jinja_template);
//                                     }
//                                 });
//                                 dialoge_.show();
//                             }
//                         }, __("Report"))
//                     }
//                     if (frm.doc.docstatus == 1 && !frm.doc.spa_report_pdf) {
//                         frm.add_custom_button('Create Final Report', async () => {
//                             if (frm_.allow_only_default) {
//                                 frappe.dom.freeze();
//                                 var p_template;
//                                 if(frm_.is_jinja_template){
//                                     p_template= frm_.print_template
//                                 }else{
//                                     p_template= frm_.default_template
//                                 }
//                                 let res = await frappe.call({
//                                     method: "spa_report.api.docx_api.create_final_report",
//                                     args: {
//                                         doctype: frm.doctype,
//                                         name: frm.doc.name,
//                                         template: p_template,
//                                         letterhead: frm_.letterhead,
//                                         is_jinja_template: frm_.is_jinja_template
//                                     }
//                                 });
//                                 if (res) {
//                                     frappe.dom.unfreeze();
//                                     frm.reload_doc();
//                                     frm.refresh();
//                                 }


//                                 frappe.msgprint({
//                                     title: __('Report Created'),
//                                     indicator: 'green',
//                                     message: __('Report Created successfully. You can now submit the report.')
//                                 });

//                             } else {
//                                 const dialoge_ = new frappe.ui.Dialog({
//                                     title: 'Select Docx Template',
//                                     fields: [
//                                         {
//                                             fieldtype: "Link",
//                                             fieldname: "docx_template",
//                                             options: template,
//                                             label: "Template",
//                                             reqd: 1,
//                                             get_query: () => {
//                                                 return {
//                                                     filters: t_filters
//                                                 };
//                                             },
//                                         }
//                                     ],
//                                     size: 'small', // small, large, extra-large 
//                                     primary_action_label: 'Download',
//                                     async primary_action(values) {
//                                         frappe.dom.freeze();

//                                         dialoge_.hide();
//                                         let res = await frappe.call({
//                                             method: "spa_report.api.docx_api.create_final_report",
//                                             args: {
//                                                 doctype: frm.doctype,
//                                                 name: frm.doc.name,
//                                                 template: values.docx_template,
//                                                 letterhead: frm_.letterhead,
//                                                 is_jinja_template: frm_.is_jinja_template
//                                             }
//                                         });
//                                         if (res) {
//                                             frappe.dom.unfreeze();
//                                             // frm.set_value("spa_report_pdf", res.message.file_url);
//                                             frm.reload_doc();
//                                             frm.refresh();
//                                         }

//                                         frm.refresh()
//                                     }
//                                 });
//                                 dialoge_.show();
//                             }
//                         }, __("Report"))

//                     } else if (frm.doc.docstatus == 1 && frm.doc.spa_report_pdf) {
//                         // frappe.msgprint("hllo")
//                         frm.add_custom_button('View Report', () => {
//                             let file_url = frm.doc.spa_report_pdf;
//                             file_url = file_url.replace(/#/g, "%23");
//                             window.open(file_url);
//                         })
//                     }

//                 }
//             }

//             // before_submit: (frm) => {
//             //     if (!frm.doc.spa_report_pdf) {
//             //         frappe.validated = false;
//             //         frappe.throw(__('Please Create final report first.'));
//             //     } else {
//             //         frappe.validated = true;
//             //     }
//             // }
//         })
//     })
// }


// const download_pdf = async (doctype, doc_name, template, letterhead= None, is_jinja_template=0) => {
//     let win_ = window.open(`/api/method/spa_report.api.docx_api.get_pdf?doctype=${doctype}&name=${doc_name}&template=${template}&letterhead=${letterhead}&is_jinja_template=${is_jinja_template}`)
// }

// const download_file = async (url_) => {
//     var a = document.createElement('a');
//     a.href = url_;
//     a.style.display = 'none';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }




// create_word_btn()


console.log("Hellow from Y Print")