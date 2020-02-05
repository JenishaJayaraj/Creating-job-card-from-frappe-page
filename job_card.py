from __future__ import unicode_literals
import frappe, json
from frappe import msgprint, _
from frappe.model.document import Document
from frappe import utils
from frappe.model.mapper import get_mapped_doc
import erpnext.manufacturing.doctype.job_card.job_card
from frappe.utils import flt, cstr


@frappe.whitelist()
def create_job_card(work_order_id,operation,wip_warehouse,for_quantity,workstation,from_time,to_time,completed_qty):
	job_card = frappe.new_doc("Job Card")
	job_card.work_order = work_order_id
	job_card.operation = operation
	job_card.workstation = workstation
	job_card.for_quantity = for_quantity
	job_card.wip_warehouse = wip_warehouse
	job_card.save(ignore_permissions=True)
	frappe.db.commit()
	doc_parent = frappe.get_value("Job Card",{"work_order":work_order_id},["name"])
	doc = frappe.get_doc("Job Card",doc_parent)
	doc.append("time_logs",{
		"from_time": from_time,
		"to_time": to_time,
		"completed_qty": flt(completed_qty)
	})
	doc.save(ignore_permissions=True)
	frappe.db.commit()
	frappe.msgprint("Job Card Created")
