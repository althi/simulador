
//STAL
function MostrarBolha(){
	s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = 'BOLHA'; document.instruction_table.column" + current_cycle + "[" + x + "].className='bolha';";
	eval(s);
}

//EX

function MostrarExecucao(){
	s = "document.instruction_table.column"+ current_cycle + "[" + x + "].value = 'EXE'; document.instruction_table.column" + current_cycle + "[" + x + "].className='execucao';";

	eval(s);
}

//IF
function MostrarBusca(){
	s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = 'IF'; document.instruction_table.column" + current_cycle + "[" + x + "].className='busca';";
	eval(s);
}

//ID
function MostrarLeitura(){
	s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = 'ID'; document.instruction_table.column" + current_cycle + "[" + x + "].className='leitura';";
	eval(s);
}


//MEM
function MostraMemoria(){
	s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = 'MEM'; document.instruction_table.column" + current_cycle + "[" + x + "].className='memoria';";
	eval(s);
}

//WB
function MostraEscrita(){
	s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = 'WB'; document.instruction_table.column" + current_cycle + "[" + x + "].className='escrita';";
	eval(s);
}


//padrao
function MostraPattern(){
s = "document.instruction_table.column" + current_cycle + "[" + x + "].value = parent.top_frame.instruction_array[x].pipeline_stage;";
}

//executar o pipeline

function ExecutarPipeline(){
	for (i = 0 ; i < numeroColunas ; i++){
		ContrucaoDoPipeline();
	}
}

// mostrar a quantidade de instrucoes inseridas



//chamada do HTML
function ContruirPipeline(){


	//Cria tabela 
	document.write("<buttom class='btn btn-sm btn-success botaoEspacamento' value='Executar o Pipeline' onClick='ExecutarPipeline();'>Executar o Pipeline</buttom>");
	//document.write("<button type='button'class='btn btn-sm btn-danger botaoEspacamento'  onClick='parent.location.href='bottom.html';'>Limpar quadro</button>");
	document.write("<hr>");


	document.write("<form name='instruction_table'>");
	document.write("<table class='table table-striped'><tr><td align='center' colspan='" + numeroColunas+ "'><b>Ciclos</b></td></tr>");
	document.write("<thead><tr>");
	document.write("<th>Instruções</th>");
	for (x = 0 ; x < numeroColunas; x++)
		document.write("<th align='center'>" + (x) + "</th>");
	document.write("</tr></thead");

// ########################### criar linhas da tabela ###########################

	for (x = 0 ; x < numeroLinhas ; x++){

		if (parent.top_frame.instruction_array[x].registradorZero == "null"){

			if (parent.top_frame.instruction_array[x].operator.name == "fp_sd"  || parent.top_frame.instruction_array[x].operator.name == "int_sd"){
				document.write("<tr><td>&nbsp<b>" + x + "</b>&nbsp</td><td><input name='instruction' readonly='1' size='25' value='" + parent.top_frame.instruction_array[x].operator.name + " (" + parent.top_frame.instruction_array[x].registrador1 + ", Offset, " + parent.top_frame.instruction_array[x].registrador2 + ")'>");
			}
			else {
				document.write("<tr><td>&nbsp<b>" + x + "</b>&nbsp</td><td><input name='instruction' readonly='1' size='25' value='" + parent.top_frame.instruction_array[x].operator.name + " (" + parent.top_frame.instruction_array[x].registrador1 + ", " + parent.top_frame.instruction_array[x].registrador2 + ")'>");
			}
		}
		else {
			document.write("<tr><td>&nbsp<b>" + x + "</b>&nbsp</td><td><input name='instruction' readonly='1' size='25' value='" + parent.top_frame.instruction_array[x].operator.name + " (" + parent.top_frame.instruction_array[x].registradorZero + ", " + parent.top_frame.instruction_array[x].registrador1 + ", " + parent.top_frame.instruction_array[x].registrador2 + ")'>");
		}
		// Create the input boxes for each column in the row.
		for (y = 0 ; y < numeroColunas; y++){
			document.write("<td><input name='column" + y + "' readonly='1' size='1'></td>");
		}
		document.write("</td></tr>");
	}

// ########################### mostrar botão de execucao ###########################

	document.write("</table>");
	document.write("</form>");
}




// **************************************************************************************
 
//Contruir o pipeline de acordo com o estágio

function ContrucaoDoPipeline(){

	if (numeroLinhas != 1){

		stall = 0;
		x = 0;

		while (x < numeroLinhas){
			if (parent.top_frame.instruction_array[x].issue_cycle == null){
				break;
			}
			if (stall == 1){
				MostrarBolha();
			}
			else {
				switch(parent.top_frame.instruction_array[x].pipeline_stage){
					

					case "IF" :casoIF();
						break;

					case "ID" :casoID();
						break;


					case "EX" : casoEX();
						break;

					case "MEM" : casoMEM();	
						break;


					case "WB" : casoWB();
						break;

					case " " : casoEmpty();
						
						break;
				}

				if (stall == 1){
					MostrarBolha();
				}
				else if (parent.top_frame.instruction_array[x].pipeline_stage == "EX"){
					MostrarExecucao();
				}
				else if (parent.top_frame.instruction_array[x].pipeline_stage == "IF"){
					MostrarBusca();
				}

				else if (parent.top_frame.instruction_array[x].pipeline_stage == "ID"){
					MostrarLeitura();

				} else if (parent.top_frame.instruction_array[x].pipeline_stage == "MEM"){
					MostraMemoria();

				} else if (parent.top_frame.instruction_array[x].pipeline_stage == "WB"){
					MostraEscrita();
				}
				else {
					MostraPattern();
				}
				eval(s);
			}
			x++;
		} 

		if (stall != 1 && x < numeroLinhas){
			casoBolhaLinha();

		}
		current_cycle++;
	}

		if (numeroColunas == current_cycle){
		return;
	}

}




//casoID


//Nossa função comecou a dar muito problema. Autores desta função está na bibliografia do projeto.
function casoID(){

	for (i = (x - 1); i >= 0 ; i--){
		if (parent.top_frame.instruction_array[i].pipeline_stage == "EX" && parent.top_frame.instruction_array[i].operator.functional_unit == parent.top_frame.instruction_array[x].operator.functional_unit){
			stall = 1;
			break;
		}
		else if ((parent.top_frame.instruction_array[i].registradorZero == parent.top_frame.instruction_array[x].registrador1 || parent.top_frame.instruction_array[i].registradorZero == parent.top_frame.instruction_array[x].registrador2)){
			if (data_forwarding == 1){

				if (parent.top_frame.instruction_array[i].operator.name == "fp_ld" || parent.top_frame.instruction_array[i].operator.name == "fp_sd"){
					if (parent.top_frame.instruction_array[i].pipeline_stage != "WB" && parent.top_frame.instruction_array[i].pipeline_stage != " "){
											stall = 1;
											break;
										}
									}
									else {
										if (parent.top_frame.instruction_array[i].pipeline_stage != "MEM" && parent.top_frame.instruction_array[i].pipeline_stage != "WB" && parent.top_frame.instruction_array[i].pipeline_stage != " "){
											stall = 1;
											break;
										}
									}
								}

								else if (data_forwarding == 0){
									if (parent.top_frame.instruction_array[i].pipeline_stage != " "){
										stall = 1;
										break;
									}
								}
							}
							else if ((parent.top_frame.instruction_array[i].registradorZero == parent.top_frame.instruction_array[x].registradorZero) && (parent.top_frame.instruction_array[i].registradorZero != "null")){

								if ((parent.top_frame.instruction_array[i].pipeline_stage == "EX") && ((parent.top_frame.instruction_array[i].operator.execution_cycles - parent.top_frame.instruction_array[i].execute_counter) >= (parent.top_frame.instruction_array[x].operator.execution_cycles - 1))){
									stall = 1;
									break;
								}

							}

							else if ((parent.top_frame.instruction_array[i].pipeline_stage == "EX") && ((parent.top_frame.instruction_array[i].operator.execution_cycles - parent.top_frame.instruction_array[i].execute_counter) == (parent.top_frame.instruction_array[x].operator.execution_cycles - 1))){
								
								stall = 1;
								break;
							}
						} 	

						if (stall != 1){
						
								parent.top_frame.instruction_array[x].pipeline_stage = "EX";
								parent.top_frame.instruction_array[x].execute_counter++;
							
						}

					}

//casoIF
function casoIF(){
	parent.top_frame.instruction_array[x].pipeline_stage = "ID";
}

//casoEX

function casoEX(){

	if (parent.top_frame.instruction_array[x].execute_counter < parent.top_frame.instruction_array[x].operator.execution_cycles){
		parent.top_frame.instruction_array[x].pipeline_stage = "EX";
		parent.top_frame.instruction_array[x].execute_counter++;
	}
	else{
		parent.top_frame.instruction_array[x].pipeline_stage = "MEM";
	}
}

//casoMEM

function casoMEM(){
parent.top_frame.instruction_array[x].pipeline_stage = "WB";
}


//casoWB
function casoWB(){
	parent.top_frame.instruction_array[x].pipeline_stage = " ";
}

//casoEmpty
function casoEmpty(){
parent.top_frame.instruction_array[x].pipeline_stage = " ";
}

//caso Nao tenha bolha e ainda há linhas

function casoBolhaLinha(){ 

	parent.top_frame.instruction_array[x].issue_cycle = current_cycle;
	parent.top_frame.instruction_array[x].pipeline_stage = "IF";
	MostrarBusca();
	eval(s);

}


//------adiantamento

//FAzer função para atualizar o class="alert" automaticamente, se der tempo

if (parent.top_frame.document.forwarding_form.enabled_checkbox.checked){
	data_forwarding = 1;
document.write("<div class='container'><div class='alert alert-success role='alert'>Adiantamento de dados <strong>ativado</strong>!</div></div>");
	non_forward_delay = 0;
}
else {
	data_forwarding = 0;
	document.write("<div class='container'><div class='alert alert-danger role='alert'>Adiantamento de dados <strong>desativado</strong>!</div></div>");
	non_forward_delay = 2;
}



var current_cycle = 0;
var numeroLinhas = parent.top_frame.total_instructions;

var numeroColunas = 0;
for (i = 0 ; i < numeroLinhas ; i++){
	numeroColunas += ((parent.top_frame.instruction_array[i].operator.execution_cycles) + 10);
}




