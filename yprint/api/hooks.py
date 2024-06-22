import frappe



def create_custom_fields():   
    document_type = "Print Format" 
          
    # Check if the 'yprint_section_break' field already exists
    if not frappe.db.exists("Custom Field", {"dt": document_type, "fieldname": "yprint_section_break"}):
        custom_field = frappe.get_doc({
            "idx": 50,
            "doctype": "Custom Field",
            "dt": document_type,
            "fieldname": "yprint_section_break",
            "label": "Y Print Section",
            "fieldtype": "Section Break",
            "insert_after": "existing_fieldname"  # Change 'existing_fieldname' to the appropriate field
        })
        custom_field.insert()
    
    # Check if the 'yprint' field already exists
    if not frappe.db.exists("Custom Field", {"dt": document_type, "fieldname": "yprint"}):
        custom_field = frappe.get_doc({
            "idx": 51,
            "doctype": "Custom Field",
            "dt": document_type,
            "fieldname": "yprint",
            "label": "Y Print",
            "fieldtype": "Code",
            "options": "HTML",
            "read_only": 0,
            "hidden": 1,
            "insert_after": "existing_fieldname"
        })
        custom_field.insert()
        
      # Check if the 'yprint_editor' field already exists
    if not frappe.db.exists("Custom Field", {"dt": document_type, "fieldname": "yprint_editor"}):
        custom_field = frappe.get_doc({
            "idx": 52,
            "doctype": "Custom Field",
            "dt": document_type,
            "fieldname": "yprint_editor",
            "label": "Y Print Editor",
            "fieldtype": "HTML",
            "options": "",           
            "insert_after": "existing_fieldname"
        })
        custom_field.insert()
        
    #  # Check if the 'yprint_tab_break' field already exists
    # if not frappe.db.exists("Custom Field", {"dt": document_type, "fieldname": "yprint_tab_break"}):
    #     custom_field = frappe.get_doc({
    #         "doctype": "Custom Field",
    #         "dt": document_type,
    #         "fieldname": "yprint_tab_break",
    #         "label": "Y Print Designer",
    #         "fieldtype": "Tab Break",              
    #         "insert_after": ""  
    #     })
    #     custom_field.insert()
    
  
       
        

def remove_custom_fields():
    document_type = "Print Format" 
    custom_field_names = ["yprint_tab_break", "yprint", "yprint_editor"]
    for fieldname in custom_field_names:
        custom_field_id = f"{document_type}-{fieldname}"
        if frappe.db.exists("Custom Field", custom_field_id):
            frappe.db.delete("Custom Field", custom_field_id)