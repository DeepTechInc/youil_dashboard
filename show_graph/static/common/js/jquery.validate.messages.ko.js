/**
 * @(#)jquery.validate.messages.ko.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2012/10/12
 */

/**
 * validate �÷����� �ѱ� �޽���
 */
jQuery.extend(jQuery.validator.messages, {
   required: "�ݵ�� �Է��ؾ� �մϴ�.",
   remote: "���� �ٶ��ϴ�.",
   email: "�̸��� �ּҸ� �ùٷ� �Է��ϼ���.",
   url: "URL�� �ùٷ� �Է��ϼ���.",
   date: "��¥�� �߸� �Էµƽ��ϴ�.",
   dateISO: "ISO ���Ŀ� �´� ��¥�� �Է��ϼ���.",
   number: "���ڸ� �Է��ϼ���.",
   digits: "����(digits)�� �Է��ϼ���.",
   creditcard: "�ùٸ� �ſ�ī�� ��ȣ�� �Է��ϼ���.",
   equalTo: "���� ���� �ٸ��ϴ�.",
   accept: "�³��� �ּ���.",
   maxlength: $.validator.format("{0} ����Ʈ �̻��� �Է��� �� �����ϴ�.\r\n(��������:1����Ʈ, �ѱ�:2����Ʈ)"),
   minlength: $.validator.format("��� {0} ����Ʈ�� �Է��ؾ� �մϴ�.\r\n(��������:1����Ʈ, �ѱ�:2����Ʈ)"),
   rangelength: $.validator.format("{0} ����Ʈ �̻� {1} ����Ʈ ���Ϸ� �Է��� �ּ���.\r\n(��������:1����Ʈ, �ѱ�:2����Ʈ)"),
   range: $.validator.format("{0} ���� {1} ������ ���� �Է��ϼ���."),
   max: $.validator.format("{0} ���Ϸ� �Է��� �ּ���."),
   min: $.validator.format("{0} �̻����� �Է��� �ּ���.")
});