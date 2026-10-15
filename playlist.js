export const tandas = [
 ['1941 · Francisco Fiorentino', [['Yo soy el tango','c9UaO1KQwpI'],['Te aconsejo que me olvides','0YdWK9Lwc6U'],['El bulín de la calle Ayacucho','_B8vvMIClSQ'],['Toda mi vida','yPHYf_m9QdY']]],
 ['1941 · Instrumentals', [['Cachirulo','KDnItdfc3VI'],['Guapeando','M65wX9AWKMY'],['El tamango','1ZThSxVyx7I'],['Milongueando en el 40','hMBGbORsQ4E']]],
 ['1942–1943 · Francisco Fiorentino', [['Malena','k7r0mUZtFCQ'],['Gricel','VNwQhcq_ACg'],['Barrio de tango','MG1bv9smmO0'],['Garúa','5MZhIIxz18U']]],
 ['1943–1945 · Alberto Marino', [['Uno','0Lg7PH3JDf0'],['Me están sobrando las penas','h7gGJ6v1sfo'],['Torrente','LiKKGeeKehI'],['Sombras nada más','dfIZ-8RiIic']]],
 ['1944–1947 · Floreal Ruiz', [['Naranjo en flor','0nHk0Uex4Wk'],['Yuyo verde','qVh5tgAclEY'],['Marioneta','n-SonYyJofY'],['Confesión','iY0j8MT7cGw']]],
 ['1942–1948 · Instrumentals', [['Pablo','Hv9L8voWrNU'],['Piropos','2tV629FnCWI'],['Tres y dos','yxEOilQIC9A'],['Quejas de bandoneón','aZSDSEu7zkI']]],
 ['Later years · Roberto Goyeneche', [['En esta tarde gris','JkGPISO_KjM'],['Garúa','xWS1lSJxmi4'],['Barrio de tango','6IMBryjr_9U'],['Sur','k0HJWNGX71U']]],
 ['Later years · Roberto Rufino', [['Frente al mar','qKS6NaUB70Y'],['Mensaje','3vZ34HQWuqY'],['Ninguna','VGtqdTw_tgE'],['Quién lo habría de pensar','ziGUywoBWYo']]],
 ['Later years · Instrumentals', [['Tinta verde — 1970','i4GoMSAPR8A'],['Responso — 1963','gQdQnEcc09s'],['Quejas de bandoneón — 1958','tuI54xiPXcM'],['Danzarín — 1963','pkayqAxjM20']]],
 ['1940s · Vals · Mixed singers', [['Soñar y nada más','X81qpRtZfAU'],['Romance de barrio','WVcm07YVFj0'],['Lagrimitas de mi corazón','C2n-WB05INk']]],
 ['1940s · Milonga · Mixed singers', [['Con toda la voz que tengo','9dsjFSWvk0M'],['Con permiso','gtOnMH1xgPw'],['Ficha de oro','uqcUwpD9dY8']]]
];
export const cortinas = [
 {title:'L-O-V-E',artist:'Nat King Cole',id:'f_HmF84G7ZY',start:5},
 {title:'Hit the Road Jack',artist:'Ray Charles',id:'uSiHqxgE2d0',start:4},
 {title:'Sway',artist:'Dean Martin',id:'J76ExFgg0Vs',start:9},
 {title:'Fly Me to the Moon',artist:'Frank Sinatra',id:'JYuyWrkwpok',start:8},
 {title:'The Girl from Ipanema',artist:'Astrud Gilberto & Stan Getz',id:'sVdaFQhS86E',start:14},
 {title:'Here Comes the Sun',artist:'The Beatles',id:'KQetemT1sWc',start:13},
 {title:'Stand By Me',artist:'Ben E. King',id:'hwZNL7QVJjE',start:60},
 {title:'Crazy Little Thing Called Love',artist:'Queen',id:'zO6D_BAuYCI',start:8},
 {title:'Dancing Queen',artist:'ABBA',id:'xFrGuyw1V8s',start:72},
 {title:'September',artist:'Earth, Wind & Fire',id:'Gs069dndIYk',start:49}
];
export function fadeVolume(track,time,volume){return track.kind==='cortina'?Math.round(volume*Math.min(1,Math.max(0,(track.end-time)/2))):volume;}
