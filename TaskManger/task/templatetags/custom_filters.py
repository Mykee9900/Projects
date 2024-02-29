# your_app/templatetags/custom_filters.py
from django import template

register = template.Library()

@register.filter(name='count_tasks_by_status')
def count_tasks_by_status(tasks, status):
    return tasks.filter(status=status).count()

