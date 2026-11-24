const CUR='2025-26';
const P=RAW.split('\n').map(l=>{const[name,pos,g,pts,reb,ast,stl,blk]=l.split('|');return{name,yr:CUR,pos,g:+g,pts:+pts,reb:+reb,ast:+ast,stl:+stl,blk:+blk}})
  .concat((HIST+'\n'+ERA_HIST).split('\n').map(l=>{const[name,yr,pos,g,pts,reb,ast,stl,blk,tr]=l.split('|');return{name,yr,pos,g:+g,pts:+pts,reb:+reb,ast:+ast,stl:+stl,blk:+blk,na:stl==='',tr:tr.split(' ').filter(Boolean)}}))
  .map((p,i)=>{p.id=i;p.score=p.pts+2*p.reb+2*p.ast+4*p.stl+4*p.blk;p.eff=effOf(p.score);p.val=Math.max(0,(p.eff-35)*.3);return p});
// Each player's team that season (Basketball-Reference), and the franchise it belongs to today (relocations folded in).
const TEAMS=`Nikola Jokic|2025-26|DEN
Shai Gilgeous-Alexander|2025-26|OKC
Giannis Antetokounmpo|2025-26|MIL
Victor Wembanyama|2025-26|SAS
Luka Doncic|2025-26|LAL
Anthony Edwards|2025-26|MIN
Cade Cunningham|2025-26|DET
Jalen Brunson|2025-26|NYK
Donovan Mitchell|2025-26|CLE
Stephen Curry|2025-26|GSW
Evan Mobley|2025-26|CLE
Kevin Durant|2025-26|HOU
Tyrese Maxey|2025-26|PHI
Devin Booker|2025-26|PHO
Jaylen Brown|2025-26|BOS
Jalen Williams|2025-26|OKC
Paolo Banchero|2025-26|ORL
Anthony Davis|2025-26|DAL
Karl-Anthony Towns|2025-26|NYK
Kawhi Leonard|2025-26|LAC
LeBron James|2025-26|LAL
Alperen Sengun|2025-26|HOU
Jamal Murray|2025-26|DEN
Chet Holmgren|2025-26|OKC
Joel Embiid|2025-26|PHI
Franz Wagner|2025-26|ORL
Scottie Barnes|2025-26|TOR
Amen Thompson|2025-26|HOU
Jalen Johnson|2025-26|ATL
Pascal Siakam|2025-26|IND
Cooper Flagg|2025-26|DAL
Trae Young|2025-26|ATL
LaMelo Ball|2025-26|CHO
Domantas Sabonis|2025-26|SAC
James Harden|2025-26|LAC
Ja Morant|2025-26|MEM
De'Aaron Fox|2025-26|SAS
Bam Adebayo|2025-26|MIA
Jaren Jackson Jr.|2025-26|MEM
Jalen Duren|2025-26|DET
Zion Williamson|2025-26|NOP
Darius Garland|2025-26|CLE
Derrick White|2025-26|BOS
Austin Reaves|2025-26|LAL
Deni Avdija|2025-26|POR
Mikal Bridges|2025-26|NYK
OG Anunoby|2025-26|NYK
Desmond Bane|2025-26|ORL
Lauri Markkanen|2025-26|UTA
Trey Murphy III|2025-26|NOP
Julius Randle|2025-26|MIN
Ivica Zubac|2025-26|LAC
Josh Giddey|2025-26|CHI
Jarrett Allen|2025-26|CLE
Norman Powell|2025-26|MIA
Zach LaVine|2025-26|SAC
Michael Porter Jr.|2025-26|BRK
Brandon Miller|2025-26|CHO
Stephon Castle|2025-26|SAS
Dyson Daniels|2025-26|ATL
Kristaps Porzingis|2025-26|ATL
Walker Kessler|2025-26|UTA
Rudy Gobert|2025-26|MIN
Myles Turner|2025-26|MIL
Coby White|2025-26|CHI
Jalen Suggs|2025-26|ORL
Josh Hart|2025-26|NYK
Aaron Gordon|2025-26|DEN
Jabari Smith Jr.|2025-26|HOU
Keegan Murray|2025-26|SAC
Jaden McDaniels|2025-26|MIN
Onyeka Okongwu|2025-26|ATL
Isaiah Hartenstein|2025-26|OKC
Alex Sarr|2025-26|WAS
Immanuel Quickley|2025-26|TOR
Anfernee Simons|2025-26|BOS
Christian Braun|2025-26|DEN
Shaedon Sharpe|2025-26|POR
Jalen Green|2025-26|PHO
Naz Reid|2025-26|MIN
Herbert Jones|2025-26|NOP
Jrue Holiday|2025-26|POR
Bennedict Mathurin|2025-26|IND
Zach Edey|2025-26|MEM
Andrew Wiggins|2025-26|MIA
Draymond Green|2025-26|GSW
Cam Thomas|2025-26|BRK
Devin Vassell|2025-26|SAS
Alex Caruso|2025-26|OKC
Nic Claxton|2025-26|BRK
Tobias Harris|2025-26|DET
Tyler Herro|2025-26|MIA
Paul George|2025-26|PHI
Russell Westbrook|2025-26|SAC
Kelly Oubre Jr.|2025-26|PHI
Bobby Portis|2025-26|MIL
Tim Hardaway Jr.|2025-26|DEN
Dylan Harper|2025-26|SAS
Klay Thompson|2025-26|DAL
Obi Toppin|2025-26|IND
Jusuf Nurkic|2025-26|UTA
Harrison Barnes|2025-26|SAS
Royce O'Neale|2025-26|PHO
Marcus Smart|2025-26|LAL
Cason Wallace|2025-26|OKC
Brook Lopez|2025-26|LAC
Kentavious Caldwell-Pope|2025-26|MEM
Al Horford|2025-26|GSW
Gary Trent Jr.|2025-26|MIL
Buddy Hield|2025-26|GSW
Kyle Anderson|2025-26|UTA
Steven Adams|2025-26|HOU
Mitchell Robinson|2025-26|NYK
Mike Conley|2025-26|MIN
Caleb Martin|2025-26|DAL
Clint Capela|2025-26|HOU
Jeremy Sochan|2025-26|SAS
Dorian Finney-Smith|2025-26|HOU
Kelly Olynyk|2025-26|SAS
Tyus Jones|2025-26|ORL
Michael Jordan|1987-88|CHI
Michael Jordan|1995-96|CHI
Magic Johnson|1986-87|LAL
Larry Bird|1985-86|BOS
Kareem Abdul-Jabbar|1975-76|LAL
Wilt Chamberlain|1961-62|PHW
Bill Russell|1964-65|BOS
Shaquille O'Neal|1999-00|LAL
Tim Duncan|2001-02|SAS
Hakeem Olajuwon|1993-94|HOU
Kobe Bryant|2005-06|LAL
LeBron James|2008-09|CLE
LeBron James|2012-13|MIA
Stephen Curry|2015-16|GSW
Kevin Durant|2013-14|OKC
Kevin Garnett|2003-04|MIN
Dirk Nowitzki|2006-07|DAL
Allen Iverson|2000-01|PHI
Dwyane Wade|2008-09|MIA
Steve Nash|2006-07|PHO
Chris Paul|2007-08|NOH
Russell Westbrook|2016-17|OKC
James Harden|2018-19|HOU
Charles Barkley|1992-93|PHO
Karl Malone|1996-97|UTA
John Stockton|1989-90|UTA
Dennis Rodman|1991-92|DET
David Robinson|1993-94|SAS
Patrick Ewing|1989-90|NYK
Scottie Pippen|1993-94|CHI
Dwight Howard|2010-11|ORL
Giannis Antetokounmpo|2019-20|MIL
Nikola Jokic|2021-22|DEN
Isiah Thomas|1984-85|DET
Julius Erving|1980-81|PHI
Moses Malone|1982-83|PHI
Dominique Wilkins|1985-86|ATL
Tracy McGrady|2002-03|ORL
Vince Carter|2000-01|TOR
Ray Allen|2005-06|SEA
Reggie Miller|1989-90|IND
Gary Payton|1999-00|SEA
Jason Kidd|2002-03|NJN
Paul Pierce|2005-06|BOS
Anthony Davis|2017-18|NOP
Ben Wallace|2002-03|DET
Dikembe Mutombo|1995-96|DEN
Yao Ming|2008-09|HOU
Manute Bol|1985-86|WSB
Grant Hill|1996-97|DET
Kevin McHale|1986-87|BOS
Clyde Drexler|1991-92|POR
Steve Kerr|1995-96|CHI
Ben Simmons|2018-19|PHI
Kwame Brown|2003-04|WAS
Darko Milicic|2003-04|DET
Hasheem Thabeet|2009-10|MEM
Anthony Bennett|2013-14|CLE
Adam Morrison|2006-07|CHA
Jahlil Okafor|2016-17|PHI
Markelle Fultz|2017-18|PHI
Brian Scalabrine|2007-08|BOS
Michael Olowokandi|2002-03|LAC
Sam Bowie|1985-86|POR
Greg Oden|2009-10|POR
Smush Parker|2005-06|LAL
Eddy Curry|2006-07|NYK
Jimmer Fredette|2011-12|SAC
Steve Novak|2011-12|NYK
Jonny Flynn|2009-10|MIN
Michael Beasley|2009-10|MIA
Dion Waiters|2016-17|MIA
Ricky Davis|2002-03|CLE
Andrea Bargnani|2010-11|TOR
Nick Young|2013-14|LAL
J.R. Smith|2012-13|NYK
Lance Stephenson|2013-14|IND
Rasheed Wallace|2000-01|POR
Charles Oakley|1993-94|NYK
Bill Laimbeer|1985-86|DET
Shawn Bradley|1996-97|NJN
Gheorghe Muresan|1995-96|WSB
Mark Eaton|1984-85|UTA
Muggsy Bogues|1989-90|CHH
Nate Robinson|2008-09|NYK
Jason Williams|1998-99|SAC
Antoine Walker|2000-01|BOS
JaVale McGee|2010-11|WAS
Kendrick Perkins|2008-09|BOS
Tony Allen|2012-13|MEM
Bruce Bowen|2004-05|SAS
Shane Battier|2007-08|HOU
Robert Horry|2002-03|LAL
Derek Fisher|2009-10|LAL
Matthew Dellavedova|2015-16|CLE
Rajon Rondo|2009-10|BOS
Andre Drummond|2015-16|DET
DeAndre Jordan|2013-14|LAC
Kyle Korver|2014-15|ATL
Andrei Kirilenko|2003-04|UTA
Bryant Reeves|1996-97|VAN
Shawn Kemp|1999-00|CLE
Alex English|1982-83|DEN
Dennis Johnson|1979-80|SEA
Jack Sikma|1981-82|SEA
Adrian Dantley|1980-81|UTA
Elvin Hayes|1973-74|CAP
Robert Parish|1978-79|GSW
Artis Gilmore|1977-78|CHI
Reggie Theus|1985-86|SAC
Maurice Cheeks|1985-86|PHI
Jamaal Wilkes|1980-81|LAL
Norm Nixon|1978-79|LAL
Alvan Adams|1975-76|PHO
World B. Free|1978-79|SDC
Randy Smith|1977-78|BUF
George Gervin|1979-80|SAS
Scott Wedman|1980-81|KCK
Bob McAdoo|1973-74|BUF
Gus Williams|1981-82|SEA
Caldwell Jones|1979-80|PHI
Truck Robinson|1977-78|NOJ
Walter Davis|1978-79|PHO
Mickey Johnson|1977-78|CHI
Mychal Thompson|1981-82|POR
Maurice Lucas|1978-79|POR
John Lucas|1978-79|GSW
Mike Mitchell|1980-81|CLE
Calvin Murphy|1975-76|HOU
Bernard King|1984-85|NYK
Robert Reid|1980-81|HOU
Bob Lanier|1973-74|DET
Cedric Maxwell|1978-79|BOS
Marques Johnson|1978-79|MIL
Sam Lacey|1974-75|KCO
Dan Roundfield|1981-82|ATL
Buck Williams|1984-85|NJN
Ricky Sobers|1977-78|IND
Dan Issel|1979-80|DEN
Purvis Short|1984-85|GSW
T.R. Dunn|1983-84|DEN
Dave Greenwood|1981-82|CHI
Greg Ballard|1981-82|WSB
Sidney Moncrief|1984-85|MIL
John Drew|1976-77|ATL
Michael Cooper|1980-81|LAL
Fred Brown|1974-75|SEA
Terry Tyler|1979-80|DET
Mark Olberding|1980-81|SAS
Otis Birdsong|1980-81|KCK
Tom Chambers|1988-89|PHO
Tiny Archibald|1975-76|KCK
Tree Rollins|1982-83|ATL
Rolando Blackman|1983-84|DAL
Junior Bridgeman|1983-84|MIL
Johnny Davis|1978-79|IND
James Edwards|1978-79|IND
John Long|1983-84|DET
Joe Barry Carroll|1982-83|GSW
Dave Corzine|1983-84|CHI
Chris Ford|1978-79|BOS
Wes Unseld|1979-80|WSB
Paul Westphal|1975-76|PHO
Mike Newlin|1975-76|HOU
Mark Aguirre|1983-84|DAL
Bobby Jones|1976-77|DEN
Kiki Vandeweghe|1983-84|DEN
Jim Paxson|1982-83|POR
Eddie Johnson|1980-81|ATL
Brian Winters|1977-78|MIL
Dave Cowens|1973-74|BOS
Rickey Green|1981-82|UTA
Mike Bantom|1977-78|IND
Eddie Johnson|1984-85|KCK
Rick Barry|1974-75|GSW
James Donaldson|1986-87|DAL
Sidney Wicks|1974-75|POR
Herb Williams|1985-86|IND
Jo Jo White|1976-77|BOS
Cliff Robinson|1982-83|CLE
Phil Smith|1978-79|GSW
Larry Nance|1986-87|PHO
Brad Davis|1983-84|DAL
Bill Cartwright|1979-80|NYK
Jim Chones|1977-78|CLE
Terry Cummings|1982-83|SDC
Rudy Tomjanovich|1973-74|HOU
Darrell Griffith|1980-81|UTA
Charles Barkley|1986-87|PHI
Brad Daugherty|1988-89|CLE
Patrick Ewing|1988-89|NYK
Clyde Drexler|1988-89|POR
Karl Malone|1988-89|UTA
Hakeem Olajuwon|1988-89|HOU
James Worthy|1988-89|LAL
Alvin Robertson|1987-88|SAS
Jeff Malone|1986-87|WSB
Ralph Sampson|1983-84|HOU
Michael Ray Richardson|1979-80|NYK
Jeff Ruland|1983-84|WSB
Andrew Toney|1983-84|PHI
Kelly Tripucka|1982-83|DET
David Thompson|1977-78|DEN
Doug Collins|1977-78|PHI
Bob Dandridge|1975-76|MIL
Larry Kenon|1976-77|SAS
Pete Maravich|1976-77|NOJ
George McGinnis|1975-76|PHI
John Havlicek|1973-74|BOS
Billy Knight|1976-77|IND
Bill Walton|1976-77|POR
Phil Chenier|1973-74|CAP
Earl Monroe|1974-75|NYK
Norm Van Lier|1973-74|CHI
Dave Bing|1974-75|DET
Walt Frazier|1973-74|NYK
Gail Goodrich|1973-74|LAL
Spencer Haywood|1973-74|SEA
Charlie Scott|1973-74|PHO
Glen Rice|1993-94|MIA
Mitch Richmond|1990-91|GSW
Hersey Hawkins|1990-91|PHI
Otis Thorpe|1991-92|HOU
Mookie Blaylock|1994-95|ATL
Joe Dumars|1990-91|DET
Jeff Hornacek|1991-92|PHO
Horace Grant|1991-92|CHI
Detlef Schrempf|1992-93|IND
Gary Payton|1998-99|SEA
Tim Hardaway|1990-91|GSW
A.C. Green|1991-92|LAL
Mark Jackson|1992-93|LAC
Rod Strickland|1997-98|WAS
Dan Majerle|1991-92|PHO
Clifford Robinson|1996-97|POR
Kevin Willis|1991-92|ATL
Derek Harper|1989-90|DAL
Sean Elliott|1995-96|SAS
Shawn Kemp|1993-94|SEA
Nick Anderson|1992-93|ORL
Chris Mullin|1990-91|GSW
Tyrone Corbin|1990-91|MIN
Vlade Divac|1996-97|CHH
Armen Gilliam|1995-96|NJN
Dale Ellis|1996-97|DEN
Larry Johnson|1992-93|CHH
Grant Long|1991-92|MIA
Kendall Gill|1996-97|NJN
Sam Perkins|1989-90|DAL
Terry Porter|1989-90|POR
Vernon Maxwell|1990-91|HOU
Derrick McKey|1994-95|IND
Ron Harper|1991-92|LAC
Danny Manning|1993-94|LAC
Avery Johnson|1995-96|SAS
Kevin Johnson|1989-90|PHO
Chuck Person|1992-93|MIN
Sherman Douglas|1993-94|BOS
Olden Polynice|1996-97|SAC
Rony Seikaly|1991-92|MIA
Pooh Richardson|1990-91|MIN
Hot Rod Williams|1989-90|CLE
Buck Williams|1989-90|POR
Johnny Newman|1995-96|MIL
Sam Mitchell|1990-91|MIN
Harvey Grant|1990-91|WSB
Rik Smits|1989-90|IND
John Starks|1994-95|NYK
Anthony Mason|1995-96|NYK
Steve Smith|1995-96|ATL
Blue Edwards|1995-96|VAN
Clarence Weatherspoon|1993-94|PHI
Michael Cage|1995-96|CLE
Derrick Coleman|1993-94|NJN
Dell Curry|1995-96|CHH
Dominique Wilkins|1990-91|ATL
Tom Gugliotta|1996-97|MIN
Latrell Sprewell|1996-97|GSW
Kenny Anderson|1993-94|NJN
B.J. Armstrong|1993-94|CHI
Shaquille O'Neal|1993-94|ORL
Dale Davis|1995-96|IND
Kenny Smith|1991-92|HOU
Dennis Scott|1995-96|ORL
Jerome Kersey|1989-90|POR
Dana Barros|1994-95|PHI
Chris Morris|1990-91|NJN
Elden Campbell|1995-96|LAL
Vin Baker|1996-97|MIL
Rex Chapman|1997-98|PHO
Alonzo Mourning|1998-99|MIA
Christian Laettner|1996-97|ATL
Gerald Wilkins|1993-94|CLE
Craig Ehlo|1989-90|CLE
Loy Vaught|1995-96|LAC
Bimbo Coles|1995-96|MIA
Spud Webb|1991-92|SAC
Dee Brown|1993-94|BOS
Doug West|1992-93|MIN
Jim Jackson|1993-94|DAL
Anfernee Hardaway|1995-96|ORL
Kevin Garnett|1998-99|MIN
Eddie Jones|1998-99|CHH
Jason Kidd|1998-99|PHO
Terrell Brandon|1997-98|MIL
Mark Price|1989-90|CLE
Brad Daugherty|1991-92|CLE
Isiah Thomas|1989-90|DET
Larry Bird|1989-90|BOS
Magic Johnson|1989-90|LAL
James Worthy|1991-92|LAL
Kevin McHale|1989-90|BOS
Robert Parish|1990-91|BOS
Tom Chambers|1989-90|PHO
Danny Ferry|1995-96|CLE
Andre Miller|2001-02|CLE
Antawn Jamison|2000-01|GSW
Shawn Marion|2005-06|PHO
Mike Bibby|2000-01|VAN
Jason Terry|2000-01|ATL
Rashard Lewis|2006-07|SEA
Cuttino Mobley|2003-04|HOU
Michael Finley|1999-00|DAL
Richard Hamilton|2004-05|DET
Stephon Marbury|1999-00|NJN
Elton Brand|2005-06|LAC
Lamar Odom|2005-06|LAL
Baron Davis|2003-04|NOH
Peja Stojakovic|2003-04|SAC
Chauncey Billups|2005-06|DET
Joe Johnson|2005-06|ATL
Steve Francis|2000-01|HOU
Al Harrington|2005-06|ATL
Juwan Howard|2000-01|WAS
Shareef Abdur-Rahim|2000-01|VAN
Jason Richardson|2007-08|CHA
Metta World Peace|2003-04|IND
Brad Miller|2003-04|SAC
Jermaine O'Neal|2002-03|IND
Derek Fisher|2002-03|LAL
Pau Gasol|2006-07|MEM
Eddie Jones|2001-02|MIA
James Posey|2002-03|HOU
Sam Cassell|1999-00|MIL
Mike Miller|2006-07|MEM
Kurt Thomas|2004-05|NYK
Richard Jefferson|2007-08|NJN
Tony Parker|2008-09|SAS
Larry Hughes|2006-07|CLE
Wally Szczerbiak|2001-02|MIN
P.J. Brown|2004-05|NOH
Jalen Rose|2002-03|CHI
Desmond Mason|2004-05|MIL
Stephen Jackson|2003-04|ATL
Jamal Crawford|2007-08|NYK
Jason Williams|1999-00|SAC
Eric Snow|2002-03|PHI
Hedo Turkoglu|2007-08|ORL
Jerry Stackhouse|2000-01|DET
Corey Maggette|2003-04|LAC
Michael Redd|2005-06|MIL
Clifford Robinson|2001-02|DET
David Wesley|2000-01|CHH
Tim Thomas|2002-03|MIL
Chris Webber|2000-01|SAC
Damon Stoudamire|2003-04|POR
Marcus Camby|2007-08|DEN
Morris Peterson|2005-06|TOR
Latrell Sprewell|2001-02|NYK
Rafer Alston|2006-07|HOU
Zydrunas Ilgauskas|2004-05|CLE
Brent Barry|2001-02|SEA
Tayshaun Prince|2008-09|DET
Kenyon Martin|2002-03|NJN
Caron Butler|2007-08|WAS
Rasho Nesterovic|2003-04|SAS
Donyell Marshall|2003-04|TOR
Antonio Daniels|2005-06|WAS
Kenny Thomas|2003-04|PHI
Quentin Richardson|2004-05|PHO
Raja Bell|2005-06|PHO
Erick Dampier|2003-04|GSW
Joe Smith|2004-05|MIL
Chucky Atkins|2004-05|LAL
Matt Harpring|2004-05|UTA
Chris Bosh|2006-07|TOR
Gilbert Arenas|2006-07|WAS
Darrell Armstrong|2000-01|ORL
Carmelo Anthony|2006-07|DEN
Dwight Howard|2008-09|ORL
Brandon Roy|2008-09|POR
Amar'e Stoudemire|2007-08|PHO
David West|2007-08|NOH
Carlos Boozer|2006-07|UTA
Grant Hill|1999-00|DET
Michael Jordan|2001-02|WAS
Alonzo Mourning|1999-00|MIA
Dikembe Mutombo|1999-00|ATL
Karl Malone|1999-00|UTA
Allan Houston|2002-03|NYK
Glenn Robinson|2000-01|MIL
David Robinson|1999-00|SAS
Stromile Swift|2001-02|MEM
LaMarcus Aldridge|2013-14|POR
DeMar DeRozan|2018-19|SAS
Marc Gasol|2014-15|MEM
Trevor Ariza|2014-15|HOU
Wesley Matthews|2013-14|POR
Thaddeus Young|2013-14|PHI
Kyle Lowry|2015-16|TOR
Nicolas Batum|2013-14|POR
Paul Millsap|2015-16|ATL
Chris Paul|2013-14|LAC
Carmelo Anthony|2013-14|NYK
Rudy Gay|2009-10|MEM
Mike Conley|2010-11|MEM
Andre Iguodala|2009-10|PHI
Serge Ibaka|2013-14|OKC
Jrue Holiday|2012-13|PHI
Monta Ellis|2010-11|GSW
Joe Johnson|2009-10|ATL
Blake Griffin|2010-11|LAC
Al Horford|2012-13|ATL
Dwyane Wade|2009-10|MIA
Darren Collison|2012-13|DAL
Jeff Green|2009-10|OKC
Dirk Nowitzki|2009-10|DAL
Kemba Walker|2018-19|CHO
John Wall|2016-17|WAS
Goran Dragic|2013-14|PHO
Paul George|2018-19|OKC
Klay Thompson|2014-15|GSW
Pau Gasol|2015-16|CHI
Marvin Williams|2009-10|ATL
Damian Lillard|2017-18|POR
Marcin Gortat|2013-14|WAS
Luol Deng|2009-10|CHI
Jeff Teague|2016-17|IND
Brook Lopez|2009-10|NJN
Courtney Lee|2016-17|NYK
JJ Redick|2014-15|LAC
Jamal Crawford|2009-10|ATL
Zach Randolph|2009-10|MEM
George Hill|2012-13|IND
Taj Gibson|2017-18|MIN
Kevin Love|2013-14|MIN
Evan Turner|2012-13|PHI
Arron Afflalo|2013-14|ORL
Lou Williams|2017-18|LAC
Tyreke Evans|2014-15|NOP
Eric Gordon|2016-17|HOU
DeMarcus Cousins|2014-15|SAC
Deron Williams|2010-11|UTA
Gordon Hayward|2015-16|UTA
Tony Parker|2012-13|SAS
Marco Belinelli|2013-14|SAS
Raymond Felton|2010-11|NYK
D.J. Augustin|2010-11|CHA
Greg Monroe|2013-14|DET
David West|2009-10|NOH
Jimmy Butler|2016-17|CHI
Kyrie Irving|2018-19|BOS
Jared Dudley|2012-13|PHO
Al Jefferson|2010-11|UTA
Robin Lopez|2013-14|POR
Al-Farouq Aminu|2015-16|POR
Ersan Ilyasova|2016-17|PHI
Brandon Jennings|2012-13|MIL
Bradley Beal|2018-19|WAS
P.J. Tucker|2018-19|HOU
Danilo Gallinari|2009-10|NYK
Corey Brewer|2013-14|MIN
Harrison Barnes|2016-17|DAL
Tobias Harris|2018-19|LAC
Amir Johnson|2012-13|TOR
Josh Smith|2009-10|ATL
Tyson Chandler|2014-15|DAL
Derrick Favors|2014-15|UTA
David Lee|2009-10|NYK
Vince Carter|2009-10|ORL
Wilson Chandler|2014-15|DEN
Nikola Vucevic|2012-13|ORL
Ty Lawson|2014-15|DEN
Eric Bledsoe|2014-15|PHO
Danny Green|2014-15|SAS
Jose Calderon|2013-14|DAL
Giannis Antetokounmpo|2018-19|MIL
Joel Embiid|2018-19|PHI
Victor Oladipo|2017-18|IND
Kawhi Leonard|2018-19|TOR
Karl-Anthony Towns|2018-19|MIN
Draymond Green|2015-16|GSW
Isaiah Thomas|2016-17|BOS
Chris Bosh|2009-10|TOR
Kobe Bryant|2012-13|LAL
Tim Duncan|2012-13|SAS
Roy Hibbert|2011-12|IND
Joakim Noah|2013-14|CHI
Kevin Garnett|2010-11|BOS
Paul Pierce|2012-13|BOS
Derrick Rose|2010-11|CHI
Steve Nash|2009-10|PHO
Amar'e Stoudemire|2010-11|NYK
Derrick Williams|2012-13|MIN
Michael Kidd-Gilchrist|2016-17|CHO
Mikal Bridges|2024-25|NYK
DeMar DeRozan|2021-22|CHI
Jayson Tatum|2022-23|BOS
Domantas Sabonis|2023-24|SAC
Pascal Siakam|2021-22|TOR
Harrison Barnes|2022-23|SAC
Nikola Vucevic|2022-23|CHI
Devin Booker|2023-24|PHO
Tobias Harris|2021-22|PHI
Trae Young|2019-20|ATL
Bam Adebayo|2020-21|MIA
James Harden|2019-20|HOU
Julius Randle|2020-21|NYK
Rudy Gobert|2021-22|UTA
Buddy Hield|2021-22|SAC
Fred VanVleet|2023-24|HOU
Luka Doncic|2023-24|DAL
Anthony Edwards|2024-25|MIN
Shai Gilgeous-Alexander|2024-25|OKC
De'Aaron Fox|2023-24|SAC
Jaylen Brown|2022-23|BOS
Kentavious Caldwell-Pope|2023-24|DEN
Donovan Mitchell|2023-24|CLE
Josh Hart|2024-25|NYK
CJ McCollum|2022-23|NOP
Terry Rozier|2021-22|CHO
Royce O'Neale|2022-23|BRK
Russell Westbrook|2021-22|LAL
RJ Barrett|2020-21|NYK
LeBron James|2021-22|LAL
Damian Lillard|2022-23|POR
Darius Garland|2022-23|CLE
Zach LaVine|2020-21|CHI
Dejounte Murray|2023-24|ATL
Jalen Brunson|2023-24|NYK
Coby White|2023-24|CHI
Jrue Holiday|2023-24|BOS
Jarrett Allen|2023-24|CLE
Dorian Finney-Smith|2021-22|DAL
Dennis Schroder|2023-24|TOR
Chris Paul|2021-22|PHO
Derrick White|2024-25|BOS
Kyle Kuzma|2023-24|WAS
OG Anunoby|2024-25|NYK
P.J. Washington|2022-23|CHO
Dillon Brooks|2024-25|HOU
Tyler Herro|2024-25|MIA
Tim Hardaway Jr.|2024-25|DET
Gary Trent Jr.|2021-22|TOR
Aaron Gordon|2021-22|DEN
Jimmy Butler|2020-21|MIA
Kevin Huerter|2022-23|SAC
Andrew Wiggins|2020-21|GSW
Miles Bridges|2021-22|CHO
Ivica Zubac|2024-25|LAC
Jordan Poole|2022-23|GSW
Brook Lopez|2024-25|MIL
Kelly Oubre Jr.|2024-25|PHI
Jonas Valanciunas|2021-22|NOP
Stephen Curry|2020-21|GSW
Malik Beasley|2023-24|MIL
Spencer Dinwiddie|2022-23|DAL
Anthony Davis|2023-24|LAL
D'Angelo Russell|2023-24|LAL
Tyrese Haliburton|2023-24|IND
Mike Conley|2023-24|MIN
Karl-Anthony Towns|2024-25|NYK
Duncan Robinson|2020-21|MIA
Jerami Grant|2022-23|POR
Bradley Beal|2020-21|WAS
Norman Powell|2020-21|TOR
Luguentz Dort|2022-23|OKC
Myles Turner|2024-25|IND
Keldon Johnson|2021-22|SAS
Jaden McDaniels|2024-25|MIN
Caris LeVert|2022-23|CLE
Draymond Green|2022-23|GSW
Brandon Ingram|2023-24|NOP
Jordan Clarkson|2021-22|UTA
Anfernee Simons|2024-25|POR
Lauri Markkanen|2022-23|UTA
Donte DiVincenzo|2023-24|NYK
Tyrese Maxey|2021-22|PHI
Bogdan Bogdanovic|2023-24|ATL
Al Horford|2019-20|PHI
Jaren Jackson Jr.|2024-25|MEM
John Collins|2022-23|ATL
Deandre Ayton|2020-21|PHO
Paul George|2022-23|LAC
Tyus Jones|2024-25|PHO
Michael Porter Jr.|2024-25|DEN
Jalen Green|2024-25|HOU
Jamal Murray|2024-25|DEN
Joel Embiid|2021-22|PHI
Kevin Durant|2021-22|BRK
Kawhi Leonard|2019-20|LAC
Ja Morant|2022-23|MEM
Kyrie Irving|2020-21|BRK
Zion Williamson|2020-21|NOP
Khris Middleton|2020-21|MIL
Ben Simmons|2019-20|PHI
James Wiseman|2023-24|DET
Jayson Tatum|2025-26|BOS
Penny Hardaway|1995-96|ORL
Ron Artest|2003-04|IND
Manu Ginobili|2007-08|SAS`;
const FRMAP={NJN:'BKN',BRK:'BKN',NYN:'BKN',SEA:'OKC',NOH:'NOP',NOK:'NOP',CHO:'CHA',CHH:'CHA',WSB:'WAS',CAP:'WAS',VAN:'MEM',KCK:'SAC',KCO:'SAC',SDC:'LAC',BUF:'LAC',NOJ:'UTA',PHW:'GSW'};
// Franchise culture names: 2+ players from one franchise (any era) earn the bonus.
const FR={ATL:['Hawks','True to Atlanta'],BOS:['Celtics','Celtic Pride'],BKN:['Nets','Nets Nation'],CHA:['Hornets','Buzz City'],CHI:['Bulls','Windy City'],CLE:['Cavaliers','The Land'],
  DAL:['Mavericks','Mavs Movement'],DEN:['Nuggets','Mile High'],DET:['Pistons','Detroit Basketball'],GSW:['Warriors','Strength in Numbers'],HOU:['Rockets','Clutch City'],IND:['Pacers','Hoosier Hoops'],
  LAC:['Clippers','Clipper Nation'],LAL:['Lakers','Purple and Gold'],MEM:['Grizzlies','Bluff City'],MIA:['Heat','Heat Culture'],MIL:['Bucks','Cream City'],MIN:['Timberwolves','Wolves Pack'],
  NOP:['Pelicans','Big Easy'],NYK:['Knicks','Garden Party'],OKC:['Sonics/Thunder','Thunder Up'],ORL:['Magic','Magic Kingdom'],PHI:['76ers','Brotherly Love'],PHO:['Suns','Valley Boys'],
  POR:['Trail Blazers','Rip City'],SAC:['Kings','Light the Beam'],SAS:['Spurs','The Spurs Way'],TOR:['Raptors','We the North'],UTA:['Jazz','Utah Grit'],WAS:['Wizards','DC Family']};
{const tm={};TEAMS.split('\n').forEach(l=>{const[n,y,t]=l.split('|');tm[n+'|'+y]=t});P.forEach(p=>{p.tm=tm[p.name+'|'+p.yr]||'';p.fr=FRMAP[p.tm]||p.tm})}
// Legends are rare: each one makes a given game's pool only about 1 time in 7. Role players and busts always do.
// Legends and throwbacks only exist when eras are mixed: in a single-era game every player from that era can come up, with no labels.
const eraSet=eras=>eras&&eras.length?eras:ERAS.map(e=>e[0]),curEras=()=>eraSet(G&&G.opt&&G.opt.eras);
const legOn=eras=>eraSet(eras).length>1,tbOn=eras=>{const e=eraSet(eras);return e.length>1&&e.includes('cur')};
const isLeg=p=>p.yr!==CUR&&p.score>=60&&legOn(curEras());
// Single-era games have no legends, so blind bids go to that era's superstars instead.
const isStar=p=>isLeg(p)||(!legOn(curEras())&&p.score>=60);
const gate=(p,eras)=>!(legOn(eras)&&p.yr!==CUR&&p.score>=60)||Math.random()<TU.leg/100;
// Eras: pick which decades the pool draws from (G.opt.eras; none set means all).
const ERAS=[['cur','This season'],['20s','2020s'],['10s','2010s'],['00s','2000s'],['90s','1990s'],['old','80s & earlier']];
const eraOf=p=>{if(p.yr===CUR)return'cur';const y=+p.yr.slice(0,4)+1;return y<=1989?'old':y<=1999?'90s':y<=2009?'00s':y<=2019?'10s':'20s'};
P.forEach(p=>p.era=eraOf(p));
const eraOn=(p,eras)=>!eras||!eras.length||eras.includes(p.era);
const poolFor=(owned,eras)=>shuffle(P.filter(p=>eraOn(p,eras)&&!owned.has(p.name)&&gate(p,eras)).map(p=>p.id));
const yrTag=p=>p.yr===CUR?'':`<span class="yr">’${p.yr.slice(-2)}</span>`;
const SPOTS=7,OPEN_MS=12000,BID_MS=8000,SOLD_MS=2800,FORCED_MS=3000,BLIND_MS=15000,NOM_N=6;
// Tunable values (the "Tune values" panel). Stored on G.opt.tune so every device uses the same numbers.
const TUNE=[['cap','Starting money ($)',30,10,100,1],['fee1','Pass fee ($)',1,0,5,1],['fee2','Pass fee once any roster is full ($)',2,0,5,1],['leg','Legend chance (%)',15,0,100,5],
  ['chem','Chemistry multiplier (pairs and traits)',3,0,6,.5],['tier','Trait tier multiplier',1,0,3,.25],['pos','Penalty per missing position',15,0,40,1],['star','Star weight',1.3,1,2,.1],['bench','Bench weight',.5,0,1,.1],
  ['wreb','Rebound weight',2,0,6,.5],['wast','Assist weight',2,0,6,.5],['wstl','Steal weight',4,0,8,.5],['wblk','Block weight',4,0,8,.5],
  ['glass','Glass Joints max miss chance (%)',30,0,60,5],['hot','Hothead max ejection chance (%)',20,0,50,5],['edge','How much team score decides games',.18,.05,.5,.01],
  ['intEvery','Interest: every N players',5,1,15,1],['intPer','Interest: $1 per this many $ held',10,3,20,1],['lock','Bid buttons pause after a new bid (seconds)',1,0,3,.25],['fogN','Fog of war: stats shown per player',2,1,4,1],['augS','Augment pick time (seconds)',20,5,60,5],['nomS','Nomination time (seconds)',15,5,60,5]];
const TU={};let tuKey=null;
function applyTune(t){const k=JSON.stringify(t||{});if(k===tuKey)return;tuKey=k;
  TUNE.forEach(([x,,d,mn,mx])=>{const v=t&&t[x]!=null?+t[x]:d;TU[x]=isFinite(v)?Math.min(mx,Math.max(mn,v)):d});
  try{ROLE_W[0]=TU.star;ROLE_W[5]=ROLE_W[6]=TU.bench}catch(e){}
  P.forEach(p=>{p.score=p.pts+TU.wreb*p.reb+TU.wast*p.ast+TU.wstl*p.stl+TU.wblk*p.blk;p.eff=effOf(p.score);p.val=Math.max(0,(p.eff-35)*.3)})}
applyTune();
const NOM_MS_=()=>TU.nomS*1000,AUG_MS_=()=>TU.augS*1000;
const $=s=>document.querySelector(s),V=$('#view');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const randn=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rid=()=>Math.random().toString(36).slice(2,10);
const full=t=>t.r.length>=SPOTS;
// Bid clock from the setup slider: each player opens with this many seconds; a bid resets it to 2/3 of that (at least 4s).
const clockS=()=>Math.max(6,Math.min(30,Math.round(+((G&&G.opt&&G.opt.clock)||12)))),openMs=()=>clockS()*1000,bidMs=()=>Math.max(4000,Math.round(clockS()*2/3)*1000),cpuF=()=>Math.min(1,clockS()/12);
let G=null,mode='landing',online=false,isHost=false,room,game=null,peers=[],me={nick:'',team:-1};
let deadline=0,nextAt=0,cpuPlan={},sealedBids={},lastCast=0,lastState=0,lastV=null,code='',cfg=null,hostGone=false,joinErr='',pending=false,unsub=[];
try{me.nick=localStorage.getItem('d30nick')||''}catch(e){}
(async()=>{try{room=window.claude&&window.claude.use?await window.claude.use('room'):null}catch(e){room=null}if(mode==='landing')setTimeout(()=>{if(typeof render==='function')render()})})();
const canPeer=()=>!!(window.Peer&&window.RTCPeerConnection);
const netOK=()=>room||canPeer();
const viaPeer=()=>!room&&canPeer();
const hashCode=(location.hash||'').replace('#','').toUpperCase();
setTimeout(()=>{if(mode==='landing'&&room===null&&typeof render==='function')render()},2500);
{const pj=document.querySelector('script[src*=peerjs]');if(pj)pj.addEventListener('load',()=>{if(mode==='landing'&&typeof render==='function')render()})}

function av(p,s){let h=0;for(const ch of p.name)h=(h*31+ch.charCodeAt(0))%360;
  const ini=p.name.split(/[\s-]+/).filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
  return`<svg class="av" width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="hsl(${h} 40% 86%)"/><path d="M33 14h9q8 12 16 0h9l3 20q11 4 13 15l-3 41H20l-3-41q2-11 13-15z" fill="hsl(${h} 60% 38%)" stroke="hsl(${h} 60% 24%)" stroke-width="2.5"/><text x="50" y="73" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="27" fill="#fff">${esc(ini)}</text></svg>`}
const tn=i=>esc(G.teams[i].n);
const local=()=>online?(me.team>=0&&me.team<G.teams.length?[me.team]:[]):G.teams.map((t,i)=>t.cpu?-1:i).filter(i=>i>=0);

// ---------- host engine ----------
function newG(names,cpu,e,o){applyTune(o&&o.tune);const g={e:e||rid(),v:1,phase:'auction',opt:Object.assign({},o||{}),teams:names.map((n,i)=>({n,c:TU.cap,r:[],cpu:!!cpu[i],cu:0,rd:0})),pool:poolFor(new Set(),o&&o.eras),nom:0,lot:null,log:[],res:null};
  g.fs=1+Math.floor(Math.random()*1e9);if(g.opt.cards)dealCards(g.teams,g.opt.eras);if(g.opt.bounty)dealBounties(g.teams);if(g.opt.scout)hideTraits(g,names.length);return g}
// ---------- CPU skill ----------
// Easy: rough stat value with lots of noise. Normal: stat value plus some chemistry. Hard: plays to win (below).
const AIK={bp:.35,bf:.95,rw:25,enf:1,lat:2,randAug:0};
const aiOf=t=>t.ai||(G&&G.opt&&G.opt.ai)||'normal',smart=t=>{const a=aiOf(t);return a==='hard'||a==='expert'};
// Easy: judges by points alone, ignores fit and position, and sometimes falls in love with a random player.
function easyVal(t,p){const base=Math.max(0,(p.pts-8)*.45)*TU.cap/30;return Math.max(0,Math.min(t.c,Math.round(Math.random()<.2?base*1.8+2:base*(.4+Math.random()*.8))))}
// Hard CPU: what would this roster score at the end? Missing positions only count if there aren't enough open spots left to fill them.
function aiEval(t,ids,open){const o=ids.slice().sort((a,b)=>P[b].score-P[a].score),tt=Object.assign({},t,{r:o.map(id=>[id,0])}),w=wOf(tt),c=chem(o,w),pos=c.list.find(x=>x[2]==='pos');
  let v=o.reduce((s,id)=>s+P[id].eff*w[id],0)+c.total;if(pos)v+=-pos[1]-TU.pos*Math.max(0,-pos[1]/TU.pos-open);return v+extra(tt)}
// The market: B = score of a cheap leftover player; R = points one extra dollar buys, learned from what has sold so far.
function aiMarket(){const owned=new Set(G.teams.flatMap(t=>t.r.map(r=>P[r[0]].name))),left=P.filter(p=>eraOn(p,G.opt.eras)&&!owned.has(p.name)).map(p=>p.eff).sort((a,b)=>a-b);
  const B=left.length?left[Math.floor(left.length*AIK.bp)]:30;let num=0,den=0;(G.sold||[]).forEach(([sc,pr])=>{if(pr>=2){num+=Math.max(0,sc-B);den+=pr-1}});
  const R0=(1/.3)*(30/TU.cap);return{B,R:Math.min(12,Math.max(1.5,(num+R0*AIK.rw)/(den+AIK.rw)))}}
// Most this team should pay: the points he adds over a cheap filler, priced at what money buys later. Money is worth little once few spots are left.
function aiLimit(i,id,mk){const t=G.teams[i],ids=t.r.map(r=>r[0]),open=SPOTS-ids.length;if(open<=0)return 0;const{B,R}=mk||aiMarket();
  const gain=aiEval(t,ids.concat(id),open-1)-aiEval(t,ids,open)-B*AIK.bf,later=open-1,Rm=later>0?R*Math.min(1,later/AIK.lat):(hasA(t,'hoard')?6:0);
  const lim=Rm>0?1+gain/Rm:(gain>0?t.c:0);return Math.max(0,Math.min(t.c-Math.max(0,later),Math.floor(lim)))}
function aiPlan(i,id){const t=G.teams[i],mk=aiMarket(),mine=aiLimit(i,id,mk);
  // Price enforcement: if a rival wants him much more, keep bidding a little past our own value to make them pay.
  const rivals=G.teams.map((x,j)=>j!==i&&!full(x)?Math.min(x.c,aiLimit(j,id,mk)):0),top=Math.max(0,...rivals);
  return AIK.enf&&top>mine+3?Math.min(t.c-Math.max(0,SPOTS-t.r.length-1),mine+Math.min(3,Math.ceil(mine*.25))):mine}
function cpuPlanFor(t,i,id,at){const a=aiOf(t);return{val:a==='expert'?expertLimit(i,id):a==='hard'?aiPlan(i,id):a==='easy'?easyVal(t,P[id]):cpuVal(t,P[id]),at,ai:a,snipe:600+Math.random()*900}}
// Hard nominations: with the most money, put up who we want; otherwise make rivals spend on players we don't need.
function aiNom(L){const i=L.clock,t=G.teams[i],mk=aiMarket(),rich=G.teams.every((x,j)=>j===i||x.c<=t.c);
  const sc=L.ch.map(id=>{const me=aiLimit(i,id,mk),them=Math.max(0,...G.teams.map((x,j)=>j!==i&&!full(x)?Math.min(x.c,aiLimit(j,id,mk)):0));return[id,rich?me-them*.3:them-me]});
  return sc.sort((a,b)=>b[1]-a[1])[0][0]}
// Hard augments: try each one on a copy of the team; future-facing ones get a fair estimate.
function aiAug(t,offer){const{R}=aiMarket(),ids=t.r.map(r=>r[0]),open=SPOTS-ids.length,base=aiEval(t,ids,open);
  const pri={cash:5*R,tank:8*R,eye:3*R,rich:5*R,free:4*R,max:-3*R,coupon:4*R,nofee:2*R,home:5*R,hoard:6,thrift:8,vet:open*2};
  const v=a=>{const k=a.split(':')[0],tt=Object.assign({},t,{aug:(t.aug||[]).concat(a)});let x=(pri[k]||0)+aiEval(tt,ids,open)-base;
    if(k==='emb'){const[,tr,id]=a.split(':');G.emb=G.emb||{};const old=G.emb[id];G.emb[id]=(old||[]).concat(tr);x=aiEval(t,ids,open)-base;if(old)G.emb[id]=old;else delete G.emb[id]}
    return x+(['star','max','dfi','pace','big3','ftag','locker','chem','sixth','deep','pos'].includes(k)?open*2:0)};
  return offer.slice().sort((a,b)=>v(b)-v(a))[0]}
// Hard lineup: try every star and every bench pair, keep the best final score.
function aiLineup(t){const ids=t.r.map(r=>r[0]);if(ids.length<2)return;const pr={};t.r.forEach(r=>pr[r[0]]=r[1]);let best=null,bv=-1e9;
  const tryO=o=>{const tt=Object.assign({},t,{r:o.map(id=>[id,pr[id]])}),w=wOf(tt),v=power(o,w)+extra(tt);if(v>bv){bv=v;best=o}};
  for(const st of ids){const rest=ids.filter(x=>x!==st);if(rest.length<=4){tryO([st].concat(rest));continue}
    for(let a=0;a<rest.length;a++)for(let b=a+1;b<rest.length;b++){const bench=[rest[a],rest[b]];tryO([st].concat(rest.filter(x=>!bench.includes(x)),bench))}}
  if(best){t.r=best.map(id=>[id,pr[id]]);t.cu=1}}
// Hard rerolls: reroll while a random undrafted player beats the last signing on average by more than the money is worth.
function aiRerolls(t){for(let k=0;k<8&&opt('reroll')&&rrCost(t)<=t.c;k++){const ids=t.r.map(r=>r[0]),owned=new Set(G.teams.flatMap(x=>x.r.map(r=>P[r[0]].name)));
  const pool=P.filter(p=>eraOn(p,G.opt.eras)&&!owned.has(p.name)&&!isLeg(p));if(!pool.length)return;const cur=aiEval(t,ids,0),sam=[];
  for(let j=0;j<20;j++){const q=pool[Math.floor(Math.random()*pool.length)];sam.push(aiEval(t,ids.map(x=>x===t.last?q.id:x),0)-cur)}
  const gain=sam.reduce((a,x)=>a+x,0)/sam.length,cost=rrCost(t)*(hasA(t,'hoard')?3:cardsWantCash(t)?6:.5);if(gain<=cost||!reroll(t))return}}

// ---------- Expert CPU ----------
// Looks ahead: samples the players likely to come up for the rest of the draft, guesses what rivals would pay for each,
// and plays out how its own roster would fill with and without this player at different prices. Its limit is the
// highest price where winning him still beats passing. It also randomizes its limit a little so it can't be read.
const XK={K:12,cand:16,grid:[0,.15,.3,.5,.75,1],noise:1,mu:1,enf:1,over:0,rp:1.4,lots:1.4,ff:.7};
const pairV=(a,b)=>{let v=0;const A=trOf(P[a]),B=trOf(P[b]);for(const[x,y,,w]of SYN){if(x===y?A.includes(x)&&B.includes(x):(A.includes(x)&&B.includes(y))||(A.includes(y)&&B.includes(x)))v+=w}return v*TU.chem};
const slotOf=p=>p.pos==='C'?2:p.pos==='SF'||p.pos==='PF'?1:0;
// Quick marginal value of adding y (used only to choose; the final roster is scored with the full rules).
function quickGain(ids,y,need){const e=P[y].eff,effs=ids.map(id=>P[id].eff).sort((a,b)=>b-a),rank=effs.filter(x=>x>e).length,w=rank===0?1.3:rank<5?1:.5;
  let g=e*w;if(rank<5&&effs.length>=5)g-=effs[4]*.5;let syn=0;ids.forEach(id=>syn+=pairV(id,y));g+=syn*(w>=1?1:.5);if(need[slotOf(P[y])]>0)g+=TU.pos*.6;return g}
// Expected rival price for y: what the hungriest rival could sensibly pay, by a rough market rule.
function rivalPrice(i,y,R,B){let best=0;G.teams.forEach((x,j)=>{if(j===i||full(x))return;const o=SPOTS-x.r.length,v=Math.max(0,P[y].eff-B)/R*Math.min(1.6,Math.max(.5,x.c/o/(TU.cap/SPOTS)));best=Math.max(best,Math.min(x.c-(o-1),Math.round(v*XK.rp)))});return Math.max(0,best)}
function needOf(ids){const n=[2,2,1];ids.slice().sort((a,b)=>P[b].eff-P[a].eff).slice(0,5).forEach(id=>n[slotOf(P[id])]--);return n}
// Fill the rest of a roster from a sampled future at sampled prices; return the final full-rules score.
function fillVal(t,ids,money,sample,prices,mu){const real=ids.slice();let m=money,fill=0;const used=new Set();
  while(real.length+fill<SPOTS){const need=needOf(real);let bi=-1,bs=0;
    for(let k=0;k<sample.length;k++){if(used.has(k))continue;const pr=prices[k]+1;if(pr>m)continue;const sc=quickGain(real,sample[k],need)-mu*pr;if(sc>bs){bs=sc;bi=k}}
    if(bi<0)fill++;else{used.add(bi);real.push(sample[bi]);m-=prices[bi]+1}}
  return aiEval(Object.assign({},t,{c:m}),real,0)+fill*XK.filler}
XK.filler=30;
function expertLimit(i,id){const t=G.teams[i],ids=t.r.map(r=>r[0]),open=SPOTS-ids.length;if(open<=0||t.c<=0)return 0;
  const{B,R}=aiMarket();XK.filler=B*XK.ff;const owned=new Set(G.teams.flatMap(x=>x.r.map(r=>P[r[0]].name)));owned.add(P[id].name);
  const left=P.filter(p=>eraOn(p,G.opt.eras)&&!owned.has(p.name)&&!(isLeg(p)&&Math.random()>TU.leg/100)).map(p=>p.id);
  const lots=Math.min(left.length,Math.round(G.teams.reduce((a,x)=>a+SPOTS-x.r.length,0)*XK.lots));
  const mu=XK.mu/R,grid=[...new Set(XK.grid.map(f=>Math.round(f*t.c)))].filter(p=>p<=t.c-(open-1)).sort((a,b)=>a-b);if(!grid.length)return 0;
  let base=0;const win=grid.map(()=>0);
  for(let k=0;k<XK.K;k++){const smp=shuffle(left.slice()).slice(0,lots).sort((a,b)=>P[b].eff-P[a].eff).slice(0,XK.cand),pr=smp.map(y=>rivalPrice(i,y,R,B));
    base+=fillVal(t,ids,t.c,smp,pr,mu);grid.forEach((p,g)=>win[g]+=fillVal(t,ids.concat(id),t.c-p,smp,pr,mu))}
  // Highest price where winning still beats passing (linear between grid points).
  let lim=-1;for(let g=0;g<grid.length;g++){if(win[g]>=base)lim=grid[g];else{if(g>0&&win[g-1]>=base){const a=win[g-1]-base,b=base-win[g];lim=grid[g-1]+(grid[g]-grid[g-1])*a/(a+b)}break}}
  if(lim<0)return 0;lim=Math.floor(lim+XK.over);
  // Make rivals pay: if someone clearly wants him more, push a little past our own value.
  if(XK.enf){const top=rivalPrice(i,id,R,B);if(top>lim+3)lim+=Math.min(2,Math.ceil(lim*.2))}
  if(XK.noise&&Math.random()<.5)lim+=Math.random()<.5?-1:1;
  return Math.max(0,Math.min(t.c-(open-1),lim))}

const cardsWantCash=t=>opt('cards')&&(t.cards||[]).includes('cheap');
function cpuVal(t,p){const o=SPOTS-t.r.length,aggr=Math.max(.6,t.c/o/(TU.cap/SPOTS)),ids=t.r.map(r=>r[0]),d=chem(ids.concat(p.id),null,1).total-chem(ids,null,1).total;return Math.max(0,Math.round((p.val+d*.3)*aggr*(.85+Math.random()*.4)))}
function startLot(){
  const T=G.teams;if(T.every(full)){if(T.some(t=>!t.cpu)){G.phase='lineup';G.lot=null;changed()}else finish();return}
  if(opt('int')&&G.nom&&G.nom%TU.intEvery===0&&(!G.int||G.int.n!==G.nom))payInterest();
  const owned=new Set(T.flatMap(t=>t.r.map(r=>P[r[0]].name)));
  const draw=()=>{let id=G.pool.pop();while(id!=null&&owned.has(P[id].name))id=G.pool.pop();if(id==null){G.pool=poolFor(owned,G.opt.eras);id=G.pool.pop()}return id};
  G.nom++;
  const openT=T.map((t,i)=>i).filter(i=>!full(T[i])),clock=openT[(G.nom-1)%openT.length],forced=openT.length===1;
  if(opt('nom')&&!forced){const ch=[];for(let k=0;k<60&&ch.length<NOM_N;k++){const x=draw();if(x==null)break;if(!ch.some(y=>P[y].name===P[x].name))ch.push(x)}
    G.lot={n:G.nom,clock,pick:1,ch,hi:0,by:-1,bn:'',done:0,forced:0};deadline=Date.now()+NOM_MS_();cpuPlan={};changed();return}
  openLot(draw(),clock,forced);
}
function openLot(id,clock,forced){
  const blind=!forced&&opt('blind')&&isStar(P[id]);
  G.lot={id,n:G.nom,clock,hi:0,by:-1,bn:'',done:0,forced:forced?1:0,blind:blind?1:0,sealed:[],ps:[]};
  deadline=Date.now()+(forced?FORCED_MS:blind?BLIND_MS:openMs());cpuPlan={};sealedBids={};
  G.teams.forEach((t,i)=>{if(t.cpu)cpuPlan[i]=cpuPlanFor(t,i,id,Date.now()+(1500+Math.random()*3500)*cpuF())});
  changed();
}
// The nominating team picks one of its options; the rest go back to the bottom of the pool.
function nominate(team,id){const L=G.lot;if(!L||!L.pick||team!==L.clock||!L.ch.includes(id))return;L.ch.filter(x=>x!==id).forEach(x=>G.pool.unshift(x));openLot(id,L.clock,0)}
const cpuNom=L=>{const c=L.ch.slice().sort((x,y)=>P[y].val-P[x].val).slice(0,3);return c[Math.floor(Math.random()*c.length)]};
// Blind round: one sealed bid per team. The round ends early once every team that can bid has sealed.
function seal(i,amt,n){const L=G.lot,t=G.teams[i];
  if(!L||!L.blind||L.done||L.n!==n||!t||full(t)||!(amt>=0)||amt>t.c||!Number.isInteger(amt)||L.sealed.includes(i))return;
  sealedBids[i]=amt;L.sealed.push(i);
  if(G.teams.every((x,j)=>full(x)||x.c===0||L.sealed.includes(j)))deadline=Date.now();changed()}
function bid(i,amt,nick){
  const L=G.lot,t=G.teams[i];
  if(G.phase!=='auction'||!L||L.done||L.forced||L.blind||L.pick||!t||i===L.by||full(t)||!(amt>L.hi)||amt>t.c||!Number.isInteger(amt))return;
  L.hi=amt;L.by=i;L.bn=nick;L.ps=(L.ps||[]).filter(x=>x!==i);const now=Date.now();deadline=Math.max(deadline,now+bidMs());
  for(const j in cpuPlan)if(+j!==i&&cpuPlan[j].at!==Infinity)cpuPlan[j].at=now+(1200+Math.random()*2800)*cpuF();
  changed();
}
// Pass button: once every team that could still bid has passed (or can't afford to), the clock ends right away.
function passLot(i,n){const L=G.lot,t=G.teams[i];if(!L||L.done||L.forced||L.blind||L.pick||L.n!==n||!t||full(t)||i===L.by)return;L.ps=L.ps||[];if(!L.ps.includes(i)){L.ps.push(i);changed()}}
const allOut=L=>G.teams.every((t,j)=>j===L.by||full(t)||t.c<=L.hi||(L.ps||[]).includes(j));
// Passing costs every unfilled team $1, or $2 once any team's roster is full.
const passFee=()=>G.teams.some(full)?TU.fee2:TU.fee1;
function noBid(L){const T=G.teams;if(L.forced)return L.clock;const broke=T.map((t,i)=>i).filter(i=>!full(T[i])&&T[i].c===0);return !broke.length?-1:broke.includes(L.clock)?L.clock:broke[L.n%broke.length]}
function award(){
  const L=G.lot;
  if(L.blind&&!L.reveal){L.reveal=G.teams.map((t,i)=>sealedBids[i]!=null?sealedBids[i]:null);const bs=L.reveal.map((a,i)=>[i,a]).filter(([i,a])=>a>0);
    if(bs.length){const top=Math.max(...bs.map(x=>x[1])),w=bs.filter(x=>x[1]===top);L.by=w[Math.floor(Math.random()*w.length)][0];L.hi=top;L.bn=''}}
  if(L.by<0){const tg=noBid(L);
    if(tg<0){L.done=1;L.passed=1;const fee=passFee();G.teams.forEach(t=>{if(!full(t)&&!(hasA(t,'nofee')&&(t.nf=!t.nf)))t.c-=Math.min(fee,t.c)});L.fee=fee;G.log.unshift([L.id,-1,0]);G.log=G.log.slice(0,6);nextAt=Date.now()+SOLD_MS;changed();return}
    L.by=tg;L.hi=L.forced?Math.min(1,G.teams[tg].c):0;L.bn=''}
  const t=G.teams[L.by];let pay=L.hi;if(t.cp>0&&pay>0){pay=Math.max(0,pay-2);t.cp--;L.disc=L.hi-pay}
  {const h=(t.aug||[]).find(a=>a.startsWith('home:'));if(h&&opt('aug')&&P[L.id].fr===h.split(':')[1]&&pay>0){const d=Math.min(3,pay);pay-=d;L.disc=(L.disc||0)+d}}
  t.r.push([L.id,pay]);if(!t.cu)t.r.sort((x,y)=>P[y[0]].score-P[x[0]].score);t.c-=pay;t.last=L.id;L.done=1;
  if(opt('aug')&&(t.r.length===2||t.r.length===5)){const o=augOffer(t);if(o.length){t.offers=(t.offers||[]).concat([o]);if(t.cpu)while(t.offers.length)pickAug(t,smart(t)&&!AIK.randAug?aiAug(t,t.offers[0]):t.offers[0][Math.floor(Math.random()*t.offers[0].length)])}}
  if(t.cpu&&full(t)&&opt('reroll')){if(smart(t))aiRerolls(t);else for(let k=0;k<6&&rrCost(t)<=t.c&&P[t.last].score<30;k++)if(!reroll(t))break}
  if(t.cpu&&smart(t)&&full(t))aiLineup(t);
  G.sold=(G.sold||[]).concat([[P[L.id].eff,pay]]);G.log.unshift([L.id,L.by,pay]);G.log=G.log.slice(0,6);if(t.cpu&&L.hi>=3&&G.teams.some(x=>!x.cpu)&&Math.random()<.3)addEmo(tn(L.by),[1,4,5,7][Math.floor(Math.random()*4)],1);nextAt=Date.now()+SOLD_MS;changed();
}
function tick(now){
  const L=G.lot;if(!L){startLot();return}
  if(L.pick){if(now>=deadline)nominate(L.clock,L.ch[Math.floor(Math.random()*L.ch.length)]);else if(G.teams[L.clock].cpu&&now>=deadline-NOM_MS_()+2500)nominate(L.clock,smart(G.teams[L.clock])?aiNom(L):cpuNom(L));return}
  // Augment picks pause the auction until everyone has chosen; whoever hasn't when the clock runs out gets a random one.
  if(L.done){const pend=G.teams.filter(t=>t.offers&&t.offers.length);
    if(L.aug){if(now>=deadline||!pend.length){pend.forEach(t=>{while(t.offers.length)pickAug(t,t.offers[0][Math.floor(Math.random()*t.offers[0].length)])});L.aug=0;startLot()}return}
    if(now>=nextAt){if(pend.length){L.aug=1;L.augT=G.teams.map((t,i)=>i).filter(i=>G.teams[i].offers&&G.teams[i].offers.length);deadline=now+AUG_MS_();changed()}else startLot()}return}
  if(now>=deadline||(!L.forced&&!L.blind&&allOut(L))){award();return}
  if(L.forced)return;
  if(L.blind){G.teams.forEach((t,i)=>{const pl=cpuPlan[i];if(!pl||full(t)||t.c===0||now<pl.at||pl.at===Infinity)return;pl.at=Infinity;
    const nb=G.teams.filter(x=>!full(x)&&x.c>0).length;seal(i,Math.min(t.c,Math.max(0,Math.round(pl.ai==='hard'||pl.ai==='expert'?pl.val*(nb-1)/nb:pl.val*(.65+Math.random()*.35)))),L.n)});return}
  G.teams.forEach((t,i)=>{const pl=cpuPlan[i];if(!pl||i===L.by||full(t)||now<pl.at)return;
    const cap=Math.min(pl.val,t.c);// Hard only waits for the last second when the price is within $2 of its limit; otherwise it bids at a normal pace.
    if((pl.ai==='hard'||pl.ai==='expert')&&L.hi<cap&&cap-L.hi<=2&&L.by>=0&&now<deadline-pl.snipe*cpuF())return;
    if(L.hi<cap){const inc=cap-L.hi>4&&Math.random()<.4?3:1;bid(i,Math.min(cap,L.hi+inc),'CPU')}else{pl.at=Infinity;L.ps=L.ps||[];if(!L.ps.includes(i)){L.ps.push(i);changed()}}});
}
function series(a,b){
  const T=G.teams,box={},g=[],w=[0,0],out={},cb=[extra(T[a]),extra(T[b])],hl=[];let sat=[];
  // One game's lineup: injured or ejected players sit, and the top bench player fills each empty starting spot.
  // Each series rolls a fresh risk for every Glass Joints player (0-30% a game) and Hothead (0-20%): some series they never miss, some they miss a lot.
  const risk={};[a,b].forEach(x=>T[x].r.forEach(([id])=>{const k=trOf(P[id]);risk[id]=[k.includes('glass')&&!k.includes('iron')?Math.random()*TU.glass/100:0,k.includes('hot')?Math.random()*TU.hot/100:0]}));
  const gameW=x=>{const ids=T[x].r.map(r=>r[0]),miss=new Set(ids.filter(id=>{const inj=Math.random()<risk[id][0],ej=!inj&&Math.random()<risk[id][1];if(inj||ej)sat.push([id,inj?'inj':'ej']);return inj||ej}));
    miss.forEach(id=>out[id]=(out[id]||0)+1);
    const m={};let holes=0;ids.forEach((id,k)=>{if(miss.has(id)){if(k<5)holes++;return}m[id]=k<5?rw(T[x],k):holes>0?(holes--,1):rw(T[x],k)});return m};
  while(w[0]<4&&w[1]<4){
    sat=[];const ws=[gameW(a),gameW(b)],av=ws.map(m=>Object.keys(m).map(Number));
    const gp=av.map((ids,k)=>power(ids,ws[k])+cb[k]);
    const sc=[0,1].map(k=>Math.round(108+(gp[k]-gp[1-k])*TU.edge+randn()*10));
    if(Math.abs(sc[0]-sc[1])<=3)[0,1].forEach(k=>{sc[k]+=Math.round(av[k].filter(id=>trOf(P[id]).includes('clutch')).reduce((s,id)=>s+2*ws[k][id],0))});
    if(sc[0]===sc[1])sc[Math.random()<.5?0:1]+=2+Math.floor(Math.random()*6);
    const gb={};av.forEach((ids,k)=>{const sp=ids.reduce((s,id)=>s+P[id].pts*ws[k][id],0)||1;ids.forEach(id=>{const v=P[id].pts*Math.min(ws[k][id],1.15)*(sc[k]/108)*(.7+Math.random()*.65);gb[id]=v;box[id]=(box[id]||0)+v})});
    // Highlights: each side's top scorer (plus a standout stat), who sat, and a clutch hero in close games.
    const wk=sc[0]>sc[1]?0:1,top=av.map(ids=>{const id=ids.slice().sort((x,y)=>gb[y]-gb[x])[0];if(id==null)return null;const q=P[id];
      const ex=[['reb',q.reb,9],['ast',q.ast,7],['blk',q.blk,2.5],['stl',q.stl,2.5]].map(([k,v,th])=>[k,Math.round(v*(.6+Math.random()*.9))||0,th]).filter(x=>x[1]>=x[2]).sort((x,y)=>y[1]/y[2]-x[1]/x[2])[0];
      return[id,Math.round(gb[id]),ex?[ex[0],ex[1]]:null]});
    const cl=Math.abs(sc[0]-sc[1])<=3?av[wk].filter(id=>trOf(P[id]).includes('clutch')):[];
    hl.push({top,sat,cl:cl.length?cl[Math.floor(Math.random()*cl.length)]:null});
    g.push(sc);w[sc[0]>sc[1]?0:1]++;
  }
  const win=w[0]>w[1]?a:b,ids=T[win].r.map(r=>r[0]).sort((x,y)=>(box[y]||0)-(box[x]||0));
  return{a,b,g,w,win,hl,mvp:ids[0],mp:+((box[ids[0]]||0)/g.length).toFixed(1),out:Object.entries(out).map(([id,n])=>[+id,n])};
}
function finish(){
  G.teams.forEach(t=>{while(t.offers&&t.offers.length)pickAug(t,t.offers[0][Math.floor(Math.random()*t.offers[0].length)])});
  SEEALL=true;const T=G.teams,N=T.length,pw=T.map(t=>power(t.r.map(r=>r[0]),wOf(t))+extra(t)),rr=[],wins=T.map(()=>0);
  let fin;
  if(N===2)fin=series(0,1);
  else{for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const x=series(i,j);wins[x.win]++;rr.push(x)}
    const top=T.map((t,i)=>i).sort((x,y)=>wins[y]-wins[x]||pw[y]-pw[x]).slice(0,2);fin=series(top[0],top[1])}
  G.res={rr,fin,wins,pw:pw.map(Math.round)};SEEALL=false;
  if(opt('league'))G.res.lg=leagueRecord(T,rr,fin);
  G.phase='done';G.lot=null;changed();
}
function changed(){G.v++;render();if(online&&isHost)cast()}
function lineupAct(d){
  if(d.k==='emo'){if(G&&G.teams)addEmo(d.who,+d.e);return}
  if(d.k==='nom'){if(G&&G.phase==='auction')nominate(+d.team,+d.id);return}
  if(d.k==='pass'){if(G&&G.phase==='auction')passLot(+d.team,+d.n);return}
  if(d.k==='seal'){if(G&&G.phase==='auction')seal(+d.team,+d.amt,+d.n);return}
  const t=G&&G.teams&&G.teams[+d.team];if(!t||t.rd||(G.phase!=='auction'&&G.phase!=='lineup'))return;
  if(d.k==='rr'){if(reroll(t))changed();return}
  if(d.k==='aug'){if(pickAug(t,String(d.key)))changed();return}
  if(d.k==='mv'){const a=+d.a,b=a+(+d.dir);if(Math.abs(+d.dir)!==1||!(a>=0&&b>=0&&a<t.r.length&&b<t.r.length))return;[t.r[a],t.r[b]]=[t.r[b],t.r[a]];t.cu=1;changed()}
  else if(d.k==='rdy'&&G.phase==='lineup'){t.rd=1;if(G.teams.every(x=>x.cpu||x.rd))finish();else changed()}
}
function cast(){if(!game||!G)return;lastCast=Date.now();const d=JSON.parse(JSON.stringify(G));if(d.lot)d.lot.left=Math.max(0,deadline-Date.now());game.emit('state',d).catch(()=>{})}

