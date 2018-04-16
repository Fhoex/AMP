//----------------------------- Usuarios del flujo-----------------------------------------------------------------------
var Estado = ['Comprador', 'ADMAsignacion','ADMComprador', 'Cotizacion', 'CotizacionAmpliada', 'Jefatura', 'Subgerencia', 'SubgerenciaADM', 'Gerencia', 'GerenciaAF', 'GerenciaGeneral'];

// ----------------------------Carga de usuarios -----------------------------------------------------------------------------------------
for (i = 1; i < 7; i++) {
	var combo = __EFGetElementByEFFieldName('SQLUser_' + i);
	if (combo.length > 1) {
		__EFGetElementByEFFieldName('User_' + i).value = combo[1].value;
	} else {
		__EFGetElementByEFFieldName('User_' + i).value = '';
	}
}

// ----------------------------Carga de aprobador/rechazador -----------------------------------------------------------------------------
for (i = 3; i < 14; i++) {
	if ('[STATENAME]' == Estado[i - 3]) {
		if (i == 3 || i == 4 || i == 5 || i == 6) {
			i = 7;
		}
		for (j = i - 6; j < 7; j++) {
			if (__EFGetElementByEFFieldName('User_' + j).value != '') {
				__EFGetElementByEFFieldName('Aprobador').value = __EFGetElementByEFFieldName('User_' + j).value;
				j = 7;
			}
		}
		for (k = i - 8; k > 0; k--) {
			if (__EFGetElementByEFFieldName('User_' + k).value != '') {
				__EFGetElementByEFFieldName('Rechazador').value = __EFGetElementByEFFieldName('User_' + k).value;
				k = 0;
			}
		}
	}
}

// ----------------------------Cambio de usuario -----------------------------------------------------------------------------------------	
if ('[STATENAME]' == 'Comprador'){
	if (__EFGetElementByEFFieldName('Owner').value == '') {
		__EFGetElementByEFFieldName('BuyerUser').value = '[USERNAME]';
	} else {
		__EFGetElementByEFFieldName('BuyerUser').value = __EFGetElementByEFFieldName('Owner').value;
	}
}

if ('[STATENAME]' == 'Comprador' || '[STATENAME]' == 'ADMComprador') {
	// ----------------------------Llenado de Checkbox --------------------------------------------------------------------------------------
	var x;
	if (x === undefined) {
		var lista = __EFGetElementByEFFieldName('Checkbox_2');
		for (item in lista) {
			lista[item].checked = true;
		}
	}
	x = 0;
	CollectorRules();
}

if ('[STATENAME]' != 'Comprador' && '[STATENAME]' != 'ADMComprador') {
	// ----------------------------Llenado de HTML productos  ------------------------------------------------------------------------------
	for (i = 1; i < 6; i++) {
		cadena = __EFGetElementByEFFieldName('ProdC2F_' + i).value;
		if ('[STATENAME]' == 'Cotizacion' || '[STATENAME]' == 'CotizacionAmpliada') {
			__EFGetElementByEFFieldName('PriceC0F_' + i).value = '';
			__EFGetElementByEFFieldName('PriceC0F_' + i).disabled = true;
			if (cadena == '') {
				for (j = 1; j < 6; j++) {
					__EFGetElementByEFFieldName('PriceC' + j + 'F_' + i).value = '';
					__EFGetElementByEFFieldName('PriceC' + j + 'F_' + i).disabled = true;
				}
			}
			if (cadena != '') {
				document.getElementById('prod1_' + i).innerHTML = cadena.slice(0, 30) + '..';
				__EFGetElementByEFFieldName('PriceC0F_' + i).value = __EFGetElementByEFFieldName('ProdC5F_' + i).value;
			}
		}
		if (cadena != '' && __EFGetElementByEFFieldName('analysis').value == '1') {
			document.getElementById('prod2_' + i).innerHTML = cadena.slice(0, 30) + '..';
		}
	}
	// ----------------------------Llenado de HTML proveedores  ------------------------------------------------------------------------------
	for (i = 1; i < 6; i++) {
		cadena = __EFGetElementByEFFieldName('ProvC2F_' + i).value;
		if ('[STATENAME]' == 'Cotizacion' || '[STATENAME]' == 'CotizacionAmpliada') {
			if (cadena == '') {
				for (j = 1; j < 9; j++) {
					__EFGetElementByEFFieldName('PriceC' + i + 'F_' + j).value = '';
					__EFGetElementByEFFieldName('PriceC' + i + 'F_' + j).disabled = true;
				}
			}
			if (cadena != '') {
					document.getElementById('prov1_' + i).innerHTML = cadena.slice(0, 12) + '..';
			}
		}
		if (cadena != '' && __EFGetElementByEFFieldName('analysis').value == '1') {
			document.getElementById('prov2_' + i).innerHTML = cadena.slice(0, 12) + '..';
		}
	}
	// ----------------------------Llenado de HTML de Analisis ------------------------------------------------------------------------------
	if (__EFGetElementByEFFieldName('analysis').value == '1') {
		cambio = __EFGetElementByEFFieldName('cambio').value.replace(',', '.');
		var Total = new Array();
		for (i = 1; i < 9; i++) {
			var Analisis = new Array();
			var SubTotal = new Array();
			var x = 0;
			if (i > 5) {
				x = 1;
			}
			for (j = x; j < 6; j++) {
				var valor = __EFGetElementByEFFieldName('PriceC' + j + 'F_' + i).value.replace(',', '.');
				if (valor != '') {
					if (j == 0) {
						document.getElementById('ResultC' + j + 'F_' + i).innerHTML = valor + ' ' + __EFGetElementByEFFieldName('ProdC3F_' + i).value;
					}
					if (j > 0 && x == 0) {
						if (i == 1) {
							Total[j - 1] = 0;
						}
						moneda = __EFGetElementByEFFieldName('moneda_' + j);
						if (moneda[0].checked == true) {
							Analisis[j - 1] = valor / cambio;
							precio = parseFloat(Math.round((Analisis[j - 1] * __EFGetElementByEFFieldName('PriceC0F_' + i).value.replace(',', '.')) * 100) / 100).toFixed(2);
							document.getElementById('ResultC' + j + 'F_' + i).innerHTML = '$ ' + precio;
						}
						if (moneda[1].checked == true) {
							Analisis[j - 1] = valor;
							precio = parseFloat(Math.round((Analisis[j - 1] * __EFGetElementByEFFieldName('PriceC0F_' + i).value.replace(',', '.')) * 100) / 100).toFixed(2);
							document.getElementById('ResultC' + j + 'F_' + i).innerHTML = '$ ' + precio;
						}
						SubTotal[j - 1] = __EFGetElementByEFFieldName('PriceC0F_' + i).value.replace(',', '.') * Analisis[j - 1];
						Total[j - 1] = Total[j - 1] + SubTotal[j - 1];
					}
					if (j > 0 && x == 1 && i < 8) {
						Analisis[j - 1] = valor;
						document.getElementById('ResultC' + j + 'F_' + i).innerHTML = valor + ' días';
					}
					if (j > 0 && x == 1 && i == 8) {
						Analisis[j - 1] = valor;
						document.getElementById('ResultC' + j + 'F_' + i).innerHTML = valor + ' %';
					}
				}
			}
			var min = Math.min.apply(null, Analisis.filter(function (n) {
				return !isNaN(n);
			}));
			var max = Math.max.apply(null, Analisis.filter(function (n) {
				return !isNaN(n);
			}));
			if (i != 7) {
				comparar = min;
			} else {
				comparar = max;
			}
			for (k = 0; k < 5; k++) {
				if (Analisis[k] == comparar) {
					document.getElementById('ResultC' + (k + 1) + 'F_' + i).style.color = '#1172CA';
					document.getElementById('ResultC' + (k + 1) + 'F_' + i).style.fontWeight = 'bold';
				}
				if (i == 8 && Total[k] != undefined) {
					var minTotal = Math.min.apply(null, Total);
					document.getElementById('ResultC' + (k + 1) + 'F_9').innerHTML = '$ ' + parseFloat(Math.round(Total[k] * 100) / 100).toFixed(2);
					document.getElementById('ResultC' + (k + 1) + 'F_9').style.fontWeight = 'bold';
					if (Total[k] == minTotal) {
						document.getElementById('ResultC' + (k + 1) + 'F_9').style.color = '#1172CA';
					}
				}
			}
		}
	}
}

// ---------------------------- Solicitud de locación ---------------------------------------------------------------------

if(__EFGetElementByEFFieldName("PurchaseType").value == "1"){
	__EFGetElementByEFFieldName("Delivery").value = "Av. San Andrés 6100, Urb. Industrial Molitalia, Los Olivos.";
//https://goo.gl/maps/o15DoWLCPg62
}

if(__EFGetElementByEFFieldName("PurchaseType").value != "1"){
	__EFGetElementByEFFieldName("Delivery").value = "";
}

var ProvidrUniq = __EFGetElementByEFFieldName("UniqueProvider");
var FchaEnlarge = __EFGetElementByEFFieldName("Enlarge");
var comboLbl1 = __EFGetElementByEFFieldName("Presupuesto");
var comboLbl2 = __EFGetElementByEFFieldName("SelectProject");
var comboLbl3 = __EFGetElementByEFFieldName("PurchaseType");
var posLbl1 = comboLbl1.selectedIndex;
var posLbl2 = comboLbl2.selectedIndex;
var posLbl3 = comboLbl3.selectedIndex;

if(ProvidrUniq[0].checked){
	__EFGetElementByEFFieldName("EtiqProvider1").value = "SI";
}
if(ProvidrUniq[1].checked){
	__EFGetElementByEFFieldName("EtiqProvider1").value = "NO";
}

if(FchaEnlarge[0].checked){
	__EFGetElementByEFFieldName("EtiqEnlarge").value = "SI";
}
if(FchaEnlarge[1].checked){
	__EFGetElementByEFFieldName("EtiqEnlarge").value = "NO";
	__EFGetElementByEFFieldName("EtiqPresupuesto").value = comboLbl1[posLbl1].text;
	__EFGetElementByEFFieldName("EtiqProyect").value = comboLbl2[posLbl2].text;
	__EFGetElementByEFFieldName("EtiqType").value = comboLbl3[posLbl3].text;
}

// ----------------------------Llamado a funciones  ------------------------------------------------------------------------------

// ----------------------------Concatenación de reglas ---------------------------------------------------------------------
function CollectorRules() {
	var labels = document.getElementsByTagName('LABEL');
	var inputs = document.getElementsByTagName('INPUT');
	var R1 = labels.length;
	var R2 = inputs.length;
	var acumulado = '';
	var incoterm = '';
	for (var i = 0; i < R2; i++) {
		for (var j = 0; j < R1; j++) {
			if (inputs[i].checked == true && inputs[i].getAttribute('id') == labels[j].getAttribute('for')) {
				if (inputs[i].getAttribute('type') == 'radio' && inputs[i].getAttribute('name') == 'dnn$ctr390$InstanceDetail$ViewForm$IDd1cb9a63a4f1437aa2a3739e65ed79bf' && '[FORM:Location]' == 'ND') {
					//if(inputs[i].getAttribute('type')=='radio' && inputs[i].getAttribute('name') == 'ViewForm$IDd1cb9a63a4f1437aa2a3739e65ed79bf' && '[FORM:Location]' == 'ND'){}
					incoterm = '<tr><td width=\'20\'></td><td><li></li></td><td style=\'text-align:left;vertical-align:top;padding:0\'>Presentar la cotización bajo el Incoterm: ' + labels[j].innerHTML + '</td></tr>';
				}
				if (inputs[i].getAttribute('type') == 'checkbox') {					
					acumulado = acumulado + '<tr><td width=\'20\'></td><td><li></li></td><td style=\'text-align:left;vertical-align:top;padding:0\'>' + labels[j].innerHTML + '</td></tr>';
				}
			}
		}
	}
        __EFGetElementByEFFieldName('CheckTotal').value = '<table><tbody>' + incoterm + acumulado + '<tr><td width=\'20\'></td><td><li></li></td><td style=\'text-align:left;vertical-align:top;padding:0\'>La fecha de entrega o ejecución debe ser el [FORM:date_3]</td></tr></tbody></table>';
}

// ----------------------------Acciones de Presupuesto -----------------------------------------
function Presupuesto(C) {
	if('[FORM:UniqueProvider]' == 2 && '[FORM:Delegate]' == 2){
		if (C == 1) {
			alert('Para este presupuesto debe contar al menos con 1 proveedor');
		}
		if (C == 2) {
			alert('Para este presupuesto debe contar al menos con 2 proveedores');
		}
		if (C == 3) {
			alert('Para este presupuesto debe contar al menos con 3 proveedores');
		}
	}
}

// ----------------------------Restablecimiento de usuario propietario ---------------------------------------------
function ResetBuyer() {
	__EFGetElementByEFFieldName('BuyerUser').value = '[USERNAME]';
	__EFGetElementByEFFieldName('Owner').value = '';
}

// ----------------------------Acciones de productos ------------------------------------------------------------------
function AddRowProduct() {
	var i, j, k = 0;
	var B = new Array(5);
	for (i = 0; i < 5; i++) {
		B[i] = __EFGetElementByEFFieldName('ProdC1F_' + (i + 1)).value;
	}
	if (__EFGetElementByEFFieldName('SelectProduct').value != '') {
		for (i = 0; i < 5; i++) {
			if (B[i] == '' && k == 0) {
				for (j = 0; j < i; j++) {
					if (__EFGetElementByEFFieldName('SelectProduct').value == B[j]) {
						alert('El artículo ya se encuentra en lista');
						k = 1;
					}
				}
				if (k == 0) {
					__EFGetElementByEFFieldName('ProdC1F_' + (i + 1)).value = __EFGetElementByEFFieldName('SelectProduct').value;
					i = 5;
				}
			}
		}
	}
}

function DelRowProduct(B) {
	for (i = 1; i < 6; i++) {
		__EFGetElementByEFFieldName('ProdC' + i + 'F_' + B).value = '';
	}
}

// ----------------------------Concatenación de productos ---------------------------------------------------------------------
function CollectorProducts() {
	var salida = '';
	var acumulado = '';
	for (var i = 1; i < 6; i++) {
		if (__EFGetElementByEFFieldName('ProdC1F_' + i).value != '') {
			salida = salida + '<tr><td width=\'20\'></td><td><li></li></td>';
			for (var j = 1; j < 6; j++) {
				if (j == 1) {
					acumulado = acumulado + '<td style=\'text-align:left;vertical-align:top;padding:0\'>' + __EFGetElementByEFFieldName('ProdC' + j + 'F_' + i).value + '</td>';
				} else {
					acumulado = acumulado + '<td style=\'width:30px;\'></td><td style=\'text-align:left;vertical-align:top;padding:0\'>' + __EFGetElementByEFFieldName('ProdC' + j + 'F_' + i).value + '</td>';
				}
			}
			salida = salida + acumulado + '</tr>';
		}
		acumulado = '';
	}
	__EFGetElementByEFFieldName('CollectProducts').value = '<table><tbody>' + salida + '</tbody></table>';
}

// ----------------------------Acciones de Proveedores --------------------------------------------------------------
function AddRowProvider() {
	var i, j, k = 0;
	var B = new Array(5);
	for (i = 0; i < 5; i++) {
		B[i] = __EFGetElementByEFFieldName('ProvC1F_' + (i + 1)).value;
	}
	if (__EFGetElementByEFFieldName('SelectProvider').value != '') {
		for (i = 0; i < 5; i++) {
			if (B[i] == '' && k == 0) {
				for (j = 0; j < i; j++) {
					if (__EFGetElementByEFFieldName('SelectProvider').value == B[j]) {
						alert('El proveedor ya se encuentra en lista');
						k = 1;
					}
				}
				if (k == 0) {
					__EFGetElementByEFFieldName('ProvC1F_' + (i + 1)).value = __EFGetElementByEFFieldName('SelectProvider').value;
					i = 5;
				}
			}
		}
	}
}

function DelRowProvider(B) {
	for (i = 1; i < 6; i++) {
		__EFGetElementByEFFieldName('ProvC' + i + 'F_' + B).value = '';
	}
}

// ----------------------------Concatenación de proveedores ---------------------------------------------------------------------
function CollectorProviders() {
	var salida = '';
	var acumulado = '';
	for (var i = 1; i < 6; i++) {
		if (__EFGetElementByEFFieldName('ProvC1F_' + i).value != '') {
			salida = salida + '<tr><td width=\'20\'></td><td><li></li></td>';
			for (var j = 1; j < 5; j++) {
				if (j == 1) {
					acumulado = acumulado + '<td style=\'text-align:left;vertical-align:top;padding:0\'>' + __EFGetElementByEFFieldName('ProvC' + j + 'F_' + i).value + '</td>';
				} else {
					acumulado = acumulado + '<td style=\'width:30px;\'></td><td style=\'text-align:left;vertical-align:top;padding:0\'>' + __EFGetElementByEFFieldName('ProvC' + j + 'F_' + i).value + '</td>';
				}
			}
			salida = salida + acumulado + '</tr>';
		}
		acumulado = '';
	}
	__EFGetElementByEFFieldName('CollectProviders').value = '<table><tbody>' + salida + '</tbody></table>';
}

// ----------------------------Comparador de Fechas del lado del Servidor -------------------------------------------
function DateCompare(A) {
	var D0 = __EFGetElementByEFFieldName('date_0').value; //Fecha sistema ENG
	var D1 = __EFGetElementByEFFieldName('date_1').value; //Fecha sistema ESP
	var D2 = __EFGetElementByEFFieldName('date_2').value; //Fecha sistema ESP
        var D3 = __EFGetElementByEFFieldName('date_3').value; //Fecha sistema ESP
	var fecha0 = new Date(D0.substring(6, 10) + '/' + (D0.substring(3, 5)) + '/' + D0.substring(0, 2));
	var fecha1 = new Date(D1.substring(6, 10) + '/' + (D1.substring(3, 5)) + '/' + D1.substring(0, 2));
	var fecha2 = new Date(D2.substring(6, 10) + '/' + (D2.substring(3, 5)) + '/' + D2.substring(0, 2));
	var fecha3 = new Date(D3.substring(6, 10) + '/' + (D3.substring(3, 5)) + '/' + D3.substring(0, 2));
	var aux = A;

	if (fecha1 < fecha0) {
		alert('La fecha INICIAL no puede ser menor que la fecha ACTUAL');
		__EFGetElementByEFFieldName('date_1').value = '';
	}
	if (fecha1 == 'Invalid Date') {
		if (fecha2 < fecha0) {
			alert('La fecha FINAL no puede ser menor que la fecha ACTUAL');
			__EFGetElementByEFFieldName('date_2').value = '';
		}
	}
	if (fecha1 > fecha2) {
		alert('La fecha FINAL no puede ser menor que la fecha INICIAL');
		if (A == 1) {
			__EFGetElementByEFFieldName('date_1').value = '';
		}
		if (A == 2) {
			__EFGetElementByEFFieldName('date_2').value = '';
		}
	}
	if (fecha2 - fecha1 == 0 || fecha2 - fecha1 == 1) {
		alert('La cotización debe tener al menos 1 día calendario de diferencia.');
		if (A == 1) {
			__EFGetElementByEFFieldName('date_1').value = '';
		}
		if (A == 2) {
			__EFGetElementByEFFieldName('date_2').value = '';
		}
	}
	if (fecha2 > fecha3) {
	alert('La fecha de ENTREGA no puede ser menor que la fecha FINAL');
		if (A == 3) {
			__EFGetElementByEFFieldName('date_3').value = '';
		}
	}
	if (fecha3 - fecha2 == 0 || fecha3 - fecha2 == 1) {
		alert('La fecha de entrega debe tener al menos 1 día calendario de diferencia.');
		if (A == 2) {
			__EFGetElementByEFFieldName('date_2').value = '';
		}
		if (A == 3) {
			__EFGetElementByEFFieldName('date_3').value = '';
		}
	}
}

// ----------------------------Reemplaza punto por coma decimal ---------------------------------
function ReplaceDecimal(A) {
	__EFGetElementByEFFieldName(A.getAttribute('effieldname')).value = __EFGetElementByEFFieldName(A.getAttribute('effieldname')).value.replace('.', ',');
}

// ----------------------------Completa con ceros la OC -----------------------------------------
function CompleteOC() {
	var OC = __EFGetElementByEFFieldName('OC').value;
	var cero = '';
	var n = OC.length;
	if (n < 10) {
		for (i = n; i < 10; i++) {
			cero = '0' + cero;
		}
	}
	__EFGetElementByEFFieldName('OC').value = cero + OC;
}

// ----------------------------Procesa el análisis comparativo -----------------------------------
function Process(A) {
	__EFGetElementByEFFieldName('analysis').value = A;
}

// ----------------------------Selección de ganador ---------------------------------------
function WinnerSelect(A) {
	__EFGetElementByEFFieldName('WinnerMail').value = __EFGetElementByEFFieldName('ProvC4F_' + A).value;
}