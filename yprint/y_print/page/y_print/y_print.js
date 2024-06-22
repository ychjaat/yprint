frappe.pages['y-print'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Y Print',
        single_column: true
    });

    let Yprint = new frappe.ui.form.Yprint(wrapper);
    window.Yprint = Yprint;

    $(wrapper).bind("show", () => {
        // const route = frappe.get_route();
        // const doctype = route[1];
        // const docname = route.slice(2).join("/");
        // if (!frappe.route_options || !frappe.route_options.frm) {
        //     frappe.model.with_doc(doctype, docname, () => {
        //         let frm = { doctype: doctype, docname: docname };
        //         frm.doc = frappe.get_doc(doctype, docname);
        //         frappe.model.with_doctype(doctype, () => {
        //             frm.meta = frappe.get_meta(route[1]);
        //             Yprint.show(frm);
        //         });
        //     });
        // } else {
        //     Yprint.frm = frappe.route_options.frm.doctype
        //         ? frappe.route_options.frm
        //         : frappe.route_options.frm.frm;
        //     frappe.route_options.frm = null;
        //     Yprint.show(Yprint.frm);
        // }
    });
}

frappe.ui.form.Yprint = class {
    constructor(wrapper) {
        this.wrapper = $(wrapper);
        this.page = wrapper.page;
        this.make();
    }

    make() {
        this.print_wrapper = this.page.main.empty().html(
            `<div class="print-preview-wrapper">
                <textarea id="editor" name="editor" style="width:100%; height: 660px;"></textarea>
            </div>`
        );
    }

    show(frm) {
        this.frm = frm;
        this.set_title();
        this.set_breadcrumbs();
        this.setup_toolbar();
        this.setup_sidebar();
        this.setup_keyboard_shortcuts();
        this.preview();
    }

    set_title() {
        this.page.set_title(this.frm.docname);
    }

    set_breadcrumbs() {
        frappe.breadcrumbs.add(this.frm.meta.module, this.frm.doctype);
    }

    setup_toolbar() {
        this.page.set_primary_action(__("Print"), () => {
            // Implement your print logic here
            // Example: print the content of the Jodit editor
        }, "printer");

        this.page.add_button(__('<i class="fa fa-file-word-o"></i> Word'), () => {
            // Implement download as Word functionality
        }, {
            icon: null,
        });

        this.page.add_button(__("Refresh"), () => {
            this.refresh_print_format();
        }, {
            icon: "refresh",
        });

        this.page.add_action_icon(
            "file",
            () => {
                this.go_to_form_view();
            },
            "",
            __("Form")
        );
    }

    setup_sidebar() {
        this.sidebar = this.page.sidebar.addClass("print-preview-sidebar");

        this.print_format_selector = this.add_sidebar_item({
            fieldtype: "Link",
            fieldname: "title",
            options: "Docx Template",
            label: "Docx Template",
            get_query: () => {
                return { filters: { document_type: this.frm.doctype } };
            },
            change: (ev) => {
                this.refresh_print_format();
            },
        }).$input;
    }

    add_sidebar_item(df, is_dynamic) {
        if (df.fieldtype == "Select") {
            df.input_class = "btn btn-default btn-sm text-left";
        }

        let field = frappe.ui.form.make_control({
            df: df,
            parent: is_dynamic ? this.sidebar_dynamic_section : this.sidebar,
            render_input: 1,
        });

        if (df.default != null) {
            field.set_input(df.default);
        }

        return field;
    }

    setup_keyboard_shortcuts() {
        this.wrapper.find(".print-toolbar a.btn-default").each((i, el) => {
            frappe.ui.keys.get_shortcut_group(this.frm.page).add($(el));
        });
    }

    preview() {
        const $print_format = this.print_wrapper.find("textarea");
		
        const editor = new Jodit("#editor");
        editor.value = '<p>Initial content</p>';
    }

    refresh_print_format() {
        // Implement refresh logic if needed
    }

    go_to_form_view() {
        frappe.route_options = {
            frm: this,
        };
        frappe.set_route("Form", this.frm.doctype, this.frm.docname);
    }
};
