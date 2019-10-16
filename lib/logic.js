/**
 * Registra os boletos nos bancos
 * @param {org.boleto.cto.RegistroBoleto} registroBoleto - Transação com o Boleto que será emitido por bancoemissor/IFBeneficario
 * @transaction
 */
function registrarBoleto(registroBoleto) {
    var boleto = registroBoleto.boleto;
    
    if (boleto.boletoId == '') {
      throw new Error('Não existe Boleto');
    }
   
    boleto.codigoBarra= (Math.random() * Date.now()*10000000).toString()+(Math.random() * Date.now()*10000000).toString()+"000000"; 
    var dias = 3;
    boleto.dataVencimento = new Date(Date.now() + dias*24*60*60*1000).toLocaleString();
    boleto.status = "PENDENTE";
    
    boleto.beneficiario = registroBoleto.beneficiario;
    boleto.pagador = registroBoleto.pagador;
  
    console.log('###Registrar Boleto ID ' + boleto.boletoId.toString());
    
    return getAssetRegistry('org.boleto.cto.Boleto')
      .then(function(boletoRegistry) {
      return boletoRegistry.update(boleto);
    });
  }
  
