function LoadDaddui(register_pointer){

	register_pointer.length=2;
	register_pointer.options[0].text = "-8";
	register_pointer.options[0].value = "-8";
	register_pointer.options[1].text = "-16";
	register_pointer.options[1].text = "-16";

}

// **************************************************************************************


function getTotalInstrucoes(){
	document.getElementById("qtdeInstrucoes").innerHTML = total_instructions;
}


// **************************************************************************************



function RemoverInstrucao(){

	total_instructions--;
	UpdateDisplay();
	getTotalInstrucoes();
}

// **************************************************************************************



function Instrucao(name,registrador1,registrador2,registradorZero,operator){
	this.name = name;
	this.registrador1 = registrador1;
	this.registrador2 = registrador2;
	this.registradorZero = registradorZero;
	this.operator = operator;
	this.issue_cycle = null;
	this.pipeline_stage = null;
	this.execute_counter = 0;
}

// **************************************************************************************

function MudarTempo(operator, new_value){
	operator.execution_cycles = new_value - 0;
	UpdateDisplay();
}

// **************************************************************************************

var instruction_array_size = 50;
var total_instructions = 0;

//floats

var fp_mult = new Operator("MULTD",1,"fp_mult_unit","EX");
var fp_add = new Operator("ADDD",1,"fp_add_sub_unit","EX");
var fp_sub = new Operator("SUBD",1,"fp_add_sub_unit","EX");
var fp_div = new Operator("DIVD",1,"fp_div_unit","EX");
var fp_ld = new Operator("L.D",1,"int_unit","EX");
var fp_sd = new Operator("S.D",1,"int_unit","EX");

//inteiros

var int_mult = new Operator("MULT",1,"int_mult_unit","EX");
var int_add  = new Operator("ADDI",1,"int_unit","EX");
var int_sub  = new Operator("SUB.I",1,"int_unit","EX");
var int_div  = new Operator("DIV.I",1,"int_div_unit","EX");
var int_ld  = new Operator("LD",1,"int_unit","EX");
var int_sd  = new Operator("SD",1,"int_unit","EX");
var daddui = new Operator("DADDUI, 1, daddui_unit","EX")

var instruction_array = new Instrucao(instruction_array_size);


function MudarInstrucao(){
	var selected_value = document.tabelaPipeline.operator.options[document.tabelaPipeline.operator.selectedIndex].value;
	if (selected_value == "fp_ld"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "fp_sd"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value.substring(0,2) == "fp"){
		LoadFPRegisters(document.tabelaPipeline.registrador1);
		LoadFPRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "int_ld"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}
	else if(selected_value == "int_sd"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value.substring(0,3) == "int"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value.substring(0,2) == "br"){
		LoadOffset(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		ClearRegisters(document.tabelaPipeline.registradorZero);
	}

if (selected_value == "floatLoad"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);

	}
	else if (selected_value == "floatStore"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "floatAdicao"){
		LoadFPRegisters(document.tabelaPipeline.registrador1);
		LoadFPRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "floatSubtracao"){
		LoadFPRegisters(document.tabelaPipeline.registrador1);
		LoadFPRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "floatMultiplicacao"){
		LoadFPRegisters(document.tabelaPipeline.registrador1);
		LoadFPRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "floatDivisao"){
		LoadFPRegisters(document.tabelaPipeline.registrador1);
		LoadFPRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "inteiroLoad"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}
	else if(selected_value == "inteiroStore"){
		LoadOffsetField(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadFPRegisters(document.tabelaPipeline.registradorZero);
	}
	else if (selected_value == "inteiroAdicao"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}

	else if (selected_value == "inteiroSubtracao"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}

	else if (selected_value == "inteiroMultiplicacao"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}

	else if (selected_value == "inteiroDivisao"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadIntegerRegisters(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}
	else if(selected_value == "inteiroDaddui"){
		LoadIntegerRegisters(document.tabelaPipeline.registrador1);
		LoadDaddui(document.tabelaPipeline.registrador2);
		LoadIntegerRegisters(document.tabelaPipeline.registradorZero);
	}


}

// **************************************************************************************


function Operator(name,execution_cycles,functional_unit,display_value){
	this.name = name;
	this.execution_cycles = execution_cycles;
	this.functional_unit = functional_unit;
	this.display_value = display_value;
}

// **************************************************************************************


// **************************************************************************************

function InserirInstrucao(){

	var op = document.tabelaPipeline.operator.options[document.tabelaPipeline.operator.selectedIndex].value;
	var src_reg1 = document.tabelaPipeline.registrador1.options[document.tabelaPipeline.registrador1.selectedIndex].value;
	var src_reg2 = document.tabelaPipeline.registrador2.options[document.tabelaPipeline.registrador2.selectedIndex].value;
	var dest_reg = document.tabelaPipeline.registradorZero.options[document.tabelaPipeline.registradorZero.selectedIndex].value;
	instruction_array[total_instructions] = new Instrucao("",src_reg1,src_reg2,dest_reg,eval(op));
	total_instructions++;
	UpdateDisplay();
	getTotalInstrucoes();
	document.tabelaPipeline.registradorZero.selectedIndex = 0;
	document.tabelaPipeline.registrador1.selectedIndex = 0;
	document.tabelaPipeline.registrador2.selectedIndex = 0;
}

// **************************************************************************************

function UpdateDisplay(){
	if (total_instructions > 0){

		for (i = 0 ; i < total_instructions ; i++){
			instruction_array[i].issue_cycle = null;

			instruction_array[i].pipeline_stage = null;

			instruction_array[i].execute_counter = 0;
		}
		parent.bottom_frame.location.href='pipeline.html';
	}
	else {
		parent.bottom_frame.location.href="about:blank";
	}
}

// **************************************************************************************

function LoadExecutionTime(instruction_pointer){
	var num_of_options = 20;

	instruction_pointer.length = num_of_options;

	for (x = 0 ; x < num_of_options ; x++){
		instruction_pointer.options[x].value = x+1;
		instruction_pointer.options[x].text = x+1;
	}
}

// **************************************************************************************

function LoadIntegerRegisters(register_pointer){
	var num_of_registers = 32;

	register_pointer.length = num_of_registers;

	for (x = 0 ; x < num_of_registers ; x++){
		register_pointer.options[x].text = "R" + (x+1);
		register_pointer.options[x].value = "R" + (x+1);
	}
}


//bibliografia
// **************************************************************************************

function LoadFPRegisters(register_pointer){
	var num_of_registers = 16;

	register_pointer.length = num_of_registers;

	for (x = 0 ; x < num_of_registers ; x++){
		register_pointer.options[x].text = "F" + (x+1);
		register_pointer.options[x].value = "F" + (x+1);
	}
}

// **************************************************************************************

function LoadOffset(register_pointer){
	register_pointer.length = 1;
	register_pointer.options[0].text = "Offset";
	register_pointer.options[0].value = "Offset";
}

// **************************************************************************************

function LoadOffsetField(register_pointer){
	register_pointer.length = 1;
	register_pointer.options[0].text = "Offset";
	register_pointer.options[0].value = "Offset";
}

// **************************************************************************************

function ClearRegisters(register_pointer){
	register_pointer.length = 1;
	register_pointer.options[0].text = " ";
	register_pointer.options[0].value = "null";
}

// **************************************************************************************





// **************************************************************************************