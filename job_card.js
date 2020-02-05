frappe.pages['Job Card'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Job Card',
        single_column: true
    });
    page.set_primary_action("Create Job Card", function() {
        var d = new frappe.ui.Dialog({
            title: __('Create Job Card'),
            'fields': [{
                    'fieldname': 'work_order',
                    'fieldtype': 'Link',
                    'options': 'Work Order',
                    'label': __('Work Order')
                },
                {
                    'fieldname': 'operation',
                    'fieldtype': 'Link',
                    'options': 'Operation',
                    'label': __('Operation')
                },
                {
                    'fieldname': 'total_completed_qty',
                    'fieldtype': 'Float',
                    'label': __('Completed Qty')
                },
                {
                    'fieldname': 'from_time',
                    'fieldtype': 'Datetime',
                    'label': __('From Time')
                },
                {
                    'fieldname': 'to_time',
                    'fieldtype': 'Datetime',
                    'label': __('To Time')
                }
            ],
            primary_action_label: __('Create'),
            primary_action: function() {
                return frappe.call({
                    module: "sample.page",
                    page: "job_card",
                    method: "create_job_card",
                    args: {
                        work_order_id: d.work_order,
                        operation: d.operation,
                        total_completed_qty: d.total_completed_qty
                    }
                });
                d.hide();
                show_alert(d.get_values());
            }
        });
        d.show();;
    });
}
