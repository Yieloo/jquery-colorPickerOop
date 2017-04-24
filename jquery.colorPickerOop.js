(function($) {
        $.fn.colorPickerOop = function(params) {
        	
        	//Param�tres par d�faut
        	var params = $.extend({
        		couleur_par_defaut: '',
        		hauteur_input: 18,
        		largeur_input: 18,
        		couleurs_perso: '#000000,#F37A21,#975898,#3366FF,#DF148F,#006666,#CC0000,#808080,#663300,#AAAB07',
        		couleur_vide: true,
        		libelle_couleur_vide: 'Aucune couleur',
        		nb_cases_par_ligne: 4,
        		name: 'couleur',
        		chemin: 'components/intraknow/lib'
        	}, params);
        	
        	        	
        	//Pour chaque occurence
			this.each(function() {
	        	var $t = $(this);
	        	
	        	var bg_vide = "url("+params.chemin+"/ColorPicker_blank.gif) center center white";
	        	var bg_par_defaut = (params.couleur_par_defaut!='') ? params.couleur_par_defaut : bg_vide ;
	        	
	        	$t.css({
	        		width: params.largeur_input+'px',
	        		height: params.hauteur_input+'px',
	        		background: bg_par_defaut,
	        		cursor: 'pointer'
	        	});	        	
				
	        	var pos = $t.findPosObj(); //Pr�sent dans le fichier fonctions_jquery.js
	        	var pos_x = pos.x + params.largeur_input;
	        	var pos_y = pos.y + params.hauteur_input;	        	
	        	var tab_couleur = params.couleurs_perso.split(',');
	        	var taille_item = 15;
	        	var taille_grille = taille_item * params.nb_cases_par_ligne;
	        	
	        	//Construction de la grille � afficher
	        	var grille = "<div id='grilleColorPickerOop' style='width:"+taille_grille+"px;padding:0;position:absolute;top:"+pos_y+"px;left:"+pos_x+"px'>";
	        	for(var i=0 ; i<tab_couleur.length ; i++){
	        		var coul = $.trim(tab_couleur[i]);
	        		grille += "<div class='itemColorPickerOop' id='itemColorPickerOop_"+coul+"' style='width:"+taille_item+"px;height:"+taille_item+"px;float:left;padding:0;margin:0;cursor:pointer;background:"+coul+"'></div>";
	        	}
	        	if(params.couleur_vide) grille += "<div class='itemColorPickerOop' id='itemColorPickerOop_' style='width:"+taille_item+"px;height:"+taille_item+"px;float:left;padding:0;margin:0;cursor:pointer;background:"+bg_vide+"' title='"+params.libelle_couleur_vide+"'></div>";
	        	grille += "</div>";
	        	
	        	//Insertion du INPUT HIDDEN
	        	$t.closest('form').append("<input type='hidden' name='"+params.name+"' id='hiddenColorPickerOop_"+params.name+"' value='"+params.couleur_par_defaut+"' />");
	        	
	        	//Ev�nement CLIC sur la miniature
	        	$t.click(function(){
	        		//Cr�ation de la grille
	        		if($('#grilleColorPickerOop').length==0) {
	        			$('body').append(grille);
	        			$('.itemColorPickerOop').click(function(){
	        				$t.css('background', $(this).css('background-color'));
	        				var tab_valeur_hexa = $(this).attr('id').split('_');
	        				var valeur_hexa = tab_valeur_hexa[1];
	        				$('#hiddenColorPickerOop_'+params.name).val(valeur_hexa);
	        				$('#grilleColorPickerOop').remove();
	        			});
	        		}
	        		else $('#grilleColorPickerOop').remove();
	        	});
			});
			// Permettre le cha�nage par jQuery
			return this;
        };
        
        /**
		 * Pour trouver les coordonn�es d'un �l�ment
		 * Utilisation : 
		 * pos = $("#balise").findPosObj();
		 * alert(pos.x);
		 */
        jQuery.fn.extend({
		   findPosObj : function() {
		       obj = jQuery(this).get(0);
		       var curleft = obj.offsetLeft || 0;
		       var curtop = obj.offsetTop || 0;
		       while (obj = obj.offsetParent) {
		                curleft += obj.offsetLeft
		                curtop += obj.offsetTop
		       }
		       return {x:curleft,y:curtop};
		   }
		});
})(jQuery);