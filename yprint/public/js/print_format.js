console.log("hellow print format included")

var editor = null;

const make_editor = (frm) => {
    const html_comp = `<div class="print-preview-wrapper">                            
                             <textarea id="editor" name="editor" style="width:100%"></textarea>
                       </div>`;
    let data_wrapper = frm.fields_dict.yprint_editor.$wrapper;
    data_wrapper.html(html_comp)
    editor = new Jodit("#editor", {
        insertImageAsBase64URI: false,
        removeButtons: ['about', 'print', 'file'],
        iframe: true,
        // editHTMLDocumentMode: true,
        // allowResizeTags: new Set(['img']),
        // image:{
        //     showPreview:false
        // },
        ImageEditorOptions:{
            resizeUseRatio: false,
            min_width:100, 
            heightmin_height:100
        },
        // resizer: {
        //     showSize: true,
        //     hideSizeTimeout: 2000,
        //     useAspectRatio: false, //['img', 'table'],
        //     forImageChangeAttributes: true,
        //     min_width: 100,
        //     min_height: 100,
        //     lockAspectRatio: false
        // },
        // imageProcessor: {
        //     replaceDataURIToBlobIdInView: true // This is the default value, but for examples we set it
        //   },
        buttons: [            
            {
                name: 'save_state',
                icon: 'save',
                tooltip: 'Save',
                exec: (editor_) => {
                   console.log(editor_.value);
                   frm.set_value('yprint', editor.value);
                   frm.save();
                   frm.refresh();
                }
            },
            ...Jodit.defaultOptions.buttons,
        ]
    });
}






frappe.ui.form.on('Print Format', {
    setup: (frm) => {
        if (frm.fields_dict.yprint_editor) {
            make_editor(frm);
        }
    },


    // validate: function (frm) {
    //     if (editor && editor.value) {
    //         console.log("validation", editor.value)
    //         frm.set_value('yprint', editor.value);
    //     }
    //     // frm.set_value('html', editor.value);
    // },

    refresh: function (frm) {
        if (editor) {
            console.log("refreshing", editor.value)
            editor.value = frm.doc.yprint || "";
        }

    },

});


