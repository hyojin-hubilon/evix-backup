import React from 'react';
import { Container, Typography, Box, Divider, Link } from '@mui/material';

const KoreanPrivacyPolicy: React.FC = () => {
    return (
        <Container maxWidth="md">
            {/* Page Title */}
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    개인정보 처리방침
                </Typography>
                {/* Introduction */}
                <Typography paragraph>
                    (주)에비드넷(이하 “회사”라 함)는 정보통신망 이용촉진 및 정보보호 등에 관한 법률,
                    개인정보보호법, 통신비밀보호법, 전기통신사업법, 등 정보통신서비스제공자가
                    준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한
                    개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
                </Typography>
                <Typography paragraph>
                    본 개인정보처리방침은 회사가 제공하는 “홈페이지(https://www.evix-dct.com)"
                    (홈페이지 및 어플레케이션을 이하 ‘서비스’라 함) 이용에 적용되며 다음과 같은
                    내용을 담고 있습니다.
                </Typography>
                {/* Divider */}
                <Divider sx={{ my: 2 }} />
                {/* Section 1 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제 1조 수집하는 개인(민감)정보의 항목 및 수집방법
                </Typography>
                <Typography paragraph>
                    ① 회사는 회원가입, 본인확인 및 원활한 고객상담, 심사 서류 검증, 각종 서비스의
                    제공 등을 위해 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.{' '}
                    <br />
                    <br />
                    <div style={{ color: '#566893' }}>
                        1) 회원 : [일반 개인정보] 성명, 이메일, 비밀번호, 휴대폰번호, 소속, 직함{' '}
                        <br />
                        2) 유료회원 : [일반 개인정보] 성명, 이메일, 비밀번호, 휴대폰번호, 소속,
                        직함, 유료 회원은 결제정보(카드소유자 이름, 카드번호, 유효기간, 카드비밀번호
                        앞 2자리, CVC, 서명, 결제금액, 계좌정보), 사업자 등록증
                    </div>
                </Typography>
                <Typography paragraph>
                    ② 서비스 이용과정에서 서비스 제공 및 업무처리 과정에서 아래와 같은 정보들이
                    자동으로 생성되어 추가로 수집될 수 있습니다. <br />
                    <div style={{ color: '#566893' }}>
                        1) 서비스 이용 기록, 접속 로그, 쿠키, 접속IP 주소, 기기고유번호(디바이스
                        아이디 또는 IMEI), 불량 이용 기록, 광고식별자
                    </div>
                </Typography>
                <Typography paragraph>
                    ③ 개인정보 수집방법 <br />
                    회사는 아래와 같은 방법으로 개인정보를 수집합니다. <br />
                    <div style={{ color: '#566893' }}>
                        1) 홈페이지, 서비스 내 화면, 서면양식, 팩스, 전화, 게시판, 문의하기 <br />{' '}
                        2) 생성정보 수집 툴을 통한 수집 <br /> 3)회원 동의에 따른 제휴병원으로부터의
                        정보 수집
                    </div>
                </Typography>

                {/* Divider */}
                <Divider sx={{ my: 2 }} />
                {/* Section 2 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제 2조 개인(민감)정보 수집 및 이용목적
                </Typography>
                <Typography paragraph>
                    ① 회원 가입 및 관리 <br />
                    회사는 서비스 이용 및 관리, 본인 식별 및 인증, 각종 고지 및 통지, 불량회원의
                    부정 이용방지와 비인증 사용자 접근을 제한하기 위해 개인정보를 수집합니다.
                </Typography>
                <Typography paragraph>
                    ② 고객 서비스 제공 및 마케팅 <br />
                    서비스 이용자에게 맞춤형 서비스를 제공하기 위해 데이터를 분석하고 사용자의
                    요구에 맞춰 개선할 수 있습니다.
                </Typography>
                <Typography paragraph>
                    ③ 서비스 개선 및 민원 처리 <br />
                    민원인의 신원확인, 민원사항 확인, 사실조사를 위한 연락, 분쟁 조정을 위한
                    기록보존, 불만처리 등 민원처리, 처리결과 통보 및 고지사항 전달
                </Typography>
                <Typography paragraph>
                    ④ 신규서비스 개발 및 마케팅·광고에의 활용 <br />
                    신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고
                    게재, 서비스의 유효성 확인, 이벤트 정보 및 참여기회 제공, 광고성 정보 제공,
                    접속빈도 파악, 회원의 서비스이용에 대한 통계
                </Typography>
                {/* Section 3 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제3조 개인(민감)정보 제공 및 위탁
                </Typography>
                <Typography paragraph>
                    회사는 이용자들의 개인정보를 "2. 개인정보 수집 및 이용목적"에 고지한 범위 내에서
                    사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로
                    이용자의 개인정보를 외부에 공개하지 않습니다. 다만, ‘개인정보 수집 및 이용에
                    관한 동의’에 따른 경우는 예외로 합니다.
                </Typography>
                <Typography paragraph>
                    ① 개인정보와 의료정보의 제3자에 대한 제공 <br />
                    회사는 회원 및 제휴병원의 정보를 "개인정보의 수집 항목 및 이용목적"에서 고지한
                    범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나
                    원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만 다음의 경우에는
                    이용자의 개인정보를 제3자에게 제공(공유를 포함) 할 수 있습니다.
                </Typography>
                <Typography paragraph>
                    1) 회원이 유료결제 서비스를 이용하는 것에 한해 다음 항목을 서비스 내 결제기관에
                    제공합니다.
                </Typography>
                <Typography paragraph color={'#566893'}>
                    [일반 개인정보] <br />
                    1) 결제정보(카드소유자 이름, 카드번호, 유효기간, 카드비밀번호 앞 2자리, CVC,
                    서명, 결제금액, 계좌정보), 사업자 등록증
                </Typography>
                <Typography paragraph color={'#566893'}>
                    [민감정보] <br />
                    1) 법률규정이 있거나 법령상 의무준수를 위해 불가피한 경우 <br />
                    2) 수사기관이 수사목적을 위해 관계법령이 정한 절차를 거쳐 요구하는 경우 <br />
                    3) 통계작성 및 연구 등의 목적을 위해 필요한 경우로서 특정 개인을 알아볼 수 없는
                    형태로 개인정보를 제공하는 경우
                </Typography>
                <Typography paragraph>
                    ② 개인정보 처리 위탁 <br />
                    1) 회사는 향상된 서비스를 제공하기 위해 개인정보 처리를 위탁하여 처리할 수
                    있습니다. 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를
                    받으며, 어느 하나의 사항이 변경된 경우에도 동일합니다. 보다 나은 서비스 제공을
                    위해 위탁한 개인정보 수탁업체는 다음과 같습니다
                </Typography>
                <Typography paragraph color={'#566893'}>
                    (주)페이플 <br />
                    신용카드 등 결재 처리 및 대행 <br />
                    회원 탈퇴 시 혹은 위탁 계약 종료 시까지
                </Typography>
                <Typography paragraph>
                    2) 회사는 서비스 제공의 안정성과 최신 기술을 이용자에게 제공하기 위해 개인정보를
                    위탁하고 있으며, 이용자로부터 취득 또는 생성한 개인정보를 OCI(Oracle Cloud
                    Infrastructure)가 보유하고 있는 데이터베이스 서버(물리적 저장 장소: 한국)에
                    저장합니다. OCI는 해당 서버의 물리적인 관리만을 행하고, 이용자의 개인정보에
                    접근할 수 없습니다.
                </Typography>
                <Typography paragraph color={'#566893'}>
                    1) 항목: 서비스 이용 기록 또는 수집된 개인정보 <br />
                    2) 방법: 네트워크를 통산 전송 <br /> 3) 보유 기간: 클라우드 서비스 이용
                    변경시까지
                </Typography>
                <Typography paragraph>
                    3) 회사는 위탁계약 체결 시 위탁업무 수행목적 외 개인정보 처리금지, 기술적∙관리적
                    보호조치, 재위탁 제한, 수탁자에 대한 관리∙감독, 손해배상 등 책임에 관한 사항을
                    계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는 지를 감독하고
                    있습니다. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보
                    처리방침을 통하여 공개합니다.
                </Typography>
                {/* Section 4 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제4조 개인(민감)정보의 보유 및 이용기간
                </Typography>
                <Typography paragraph>
                    회원의 개인정보는 원칙적으로 회원가입 시부터 회원탈퇴 시까지 이용되며,
                    개인정보의 수집 및 이용목적이 달성되면 지체없이 파기됩니다. 단, 아래의 정보에
                    대해서는 아래의 이유로 명시한 기간동안 보존합니다.
                </Typography>
                <Typography paragraph>
                    ① 회사 내부 방침에 의한 정보보유 사유 <br />
                    <div style={{ color: '#566893' }}>
                        1) 부정 이용 기록: 부정 이용 방지 (1년) <br />
                        2) 문의/제휴 내용(이용자에게 별도의 동의를 구한 경우): 회원 상담 처리 (1년){' '}
                        <br />
                        3) 회원 탈퇴 기록: 민원처리 등 (탈퇴일로부터 30일)
                    </div>
                </Typography>
                <Typography paragraph>
                    ② 관련 법령에 의한 정보보유 사유 <br />
                    <div style={{ color: '#566893' }}>
                        1) 계약 또는 청약 철회 등에 관한 기록: 전자상거래 등에서의 소비자보호에 관한
                        법률 (5년) <br />
                        2) 대금결제 및 재화 등의 공급에 관한 기록: 전자상거래 등에서의 소비자보호에
                        관한 법률 (5년) <br />
                        3) 소비자의 불만 또는 분쟁처리에 관한 기록: 전자상거래 등에서의 소비자보호에
                        관한 법률 (3년) <br />
                        4) 표시/광고에 관한 기록: 전자상거래 등에서의 소비자보호에 관한 법률 (6개월){' '}
                        <br />
                        5) 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류: 국세기본법, 법인세법
                        (5년) <br />
                        6) 전자금융 거래에 관한 기록: 전자금융거래법 (5년) <br />
                        7) 웹사이트 방문에 관한 기록: 통신비밀보호법 (3개월)
                    </div>
                </Typography>
                <Typography paragraph>
                    ③ 2항에 따라 비대면진료 서비스 중 결재까지 완료된 경우에 한해, 관련한 환자명부와
                    진료기록은 5년동안 보존되고, 진료했던 의료기관의 종사자들은 해당 기간에 한해
                    관련 정보를 조회할 수 있습니다.
                </Typography>
                {/* Section 5 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제5조 (개인정보 파기절차 및 방법)
                </Typography>
                <Typography paragraph>
                    이용자의 개인정보는 개인정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다.
                    회사의 개인정보 파기절차 및 방법은 아래와 같습니다.
                </Typography>
                <Typography paragraph>
                    ① 파기절차 <br />
                    회사는 개인정보의 파기에 관한 사항을 기록하고 관리하며, 파기는 개인정보
                    보호책임자의 책임하에 수행되며, 개인정보 보호책임자는 파기 결과를 확인합니다.
                    회사는 다른 법령에 따라 보존해야 하는 경우에는 예외적으로 이용자의 개인정보를
                    파기하지 않을 수 있습니다.
                </Typography>
                <Typography paragraph>
                    ② 파기방법 <br />
                    종이나 그 밖의 기록매체에 저장된 개인정보는 파쇄하거나 소각합니다. 전자적 파일
                    형태로 저장된 개인정보는 복원이 불가능한 방법(또는 기록을 재생할 수 없는 기술적
                    방법)으로 영구 삭제합니다.
                </Typography>
                <Typography paragraph>
                    ③ 미 파기 정보의 보존방법 <br />
                    회사는 법령에 따라 개인정보를 파기하지 않고 보존하는 경우에 해당 개인정보 또는
                    개인정보파일을 다른 개인정보와 분리하여 저장 관리합니다. 회사는 별도 DB로 옮긴
                    개인정보를 법률에 의한 경우가 아니고서는 보유하는 이외의 다른 목적으로 이용하지
                    않습니다.
                </Typography>
                {/* Section 6 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제6조 (이용자 및 법정대리인의 권리와 그 행사방법)
                </Typography>
                <Typography paragraph>
                    ① 이용자 및 법정대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회, 수정
                    또는 가입해지를 요청할 수 있습니다. <br />② 회사는 이용자 혹은 법정 대리인의
                    요청에 의해 해지 또는 삭제된 개인정보는 제4조에 명시된 바에 따라 처리하고 그
                    외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                </Typography>
                {/* Section 7 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제7조 (개인정보 자동수집 장치의 설치/운영 및 거부에 관한 사항)
                </Typography>
                <Typography paragraph>
                    회사는 이용자들에게 특화된 맞춤 서비스를 제공하기 위해서 이용자들의 정보를
                    저장하고 수시로 불러오는 ’쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를
                    운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의
                    정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
                </Typography>
                <Typography paragraph>
                    ① 쿠키의 사용 목적 <br />
                    회사의 서비스와 웹 사이트들에 대한 이용자들의 방문 및 이용형태, 인기 검색어,
                    보안접속 여부, 이용자 규모 등을 파악하여 이용자에게 최적화된 정보 제공을 위하여
                    사용합니다.
                </Typography>
                <Typography paragraph>
                    ② 쿠키의 설치/운영 및 거부: <br />
                    <div style={{ color: '#566893' }}>
                        1) 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는
                        웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될
                        때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 단,
                        쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용에 어려움이
                        있을 수 있습니다. <br /> <br />
                        2) 쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을
                        선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나,
                        모든 쿠키의 저장을 거부할 수 있습니다.
                    </div>
                </Typography>
                {/* Section 8 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제8조 (개인정보의 기술적/관리적 보호 대책)
                </Typography>
                <Typography paragraph>
                    회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조
                    또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을
                    강구하고 있습니다.
                </Typography>
                <Typography paragraph>
                    ① 이용자의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나
                    파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고
                    있습니다
                </Typography>
                <Typography paragraph>
                    ② 회사는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한
                    조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런
                    바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는
                    것을 방지하고 있습니다.
                </Typography>
                <Typography paragraph>
                    ③ 해킹 등 외부침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석시스템
                    등을 이용하여 보안에 만전을 기하고 있습니다.
                </Typography>
                <Typography paragraph>
                    ④ 회사는 이용자의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있으며
                    이용자를 직접 상대로 하여 마케팅 업무를 수행하는 자, 개인정보 보호책임자 및
                    담당자 등 개인정보관리업무를 수행하는 자, 기타 업무상 개인정보의 취급이 불가피한
                    자 외에는 접근을 엄격히 제한하고 담당직원에 대한 수시 교육을 통하여 본 정책의
                    준수를 강조하고 있습니다. 단, 회사가 개인정보보호 의무를 다 하였음에도 불구하고
                    회원 본인의 부주의나 회사가 관리하지 않는 영역에서의 사고 등 회사의 귀책에
                    기인하지 않은 손해에 대해서는 회사가 책임지지 않습니다.
                </Typography>
                {/* Section 9 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제9조 (기타사항)
                </Typography>
                <Typography paragraph>
                    ① 회사의 인터넷 서비스에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에
                    대해서는 본 ‘개인정보처리방침’이 적용되지 않습니다.
                </Typography>
                <Typography paragraph>
                    ② 개인정보 정정 요청 시 정확한 개인정보의 이용 및 제공을 위해 수정이 완료될
                    때까지 이용자의 개인정보는 이용되거나 제공되지 않습니다.
                </Typography>
                {/* Section 10 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제10조 (개인정보 처리방침의 변경)
                </Typography>
                <Typography paragraph>
                    회사는 개인정보 처리방침을 변경하는 경우에 개인정보주체인 이용자가 그 변경 여부,
                    변경된 사항의 시행시기와 변경된 내용을 언제든지 쉽게 알 수 있도록 지속적으로
                    ‘서비스’를 통하여 공개합니다.
                </Typography>

                {/* Section 11 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    제11조 (개인정보보호 책임자 및 연락처)
                </Typography>
                <Typography paragraph>
                    회사는 이용자의 개인정보를 보호하고, 이용자가 회사의 서비스를 이용하시며
                    발생하는 모든 개인정보보호 관련 민원을 처리하기 위해 다음과 같이 책임자를
                    지정하고 운영하고 있습니다. 언제라도 문의 주시면 신속하고 충분한 답변을 드리도록
                    하겠습니다.
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    개인정보보호 책임자
                </Typography>
                <Typography paragraph>
                    <div style={{ color: '#566893' }}>
                        1) 이름: 송해선 <br />
                        2) 소속: 에비드넷
                        <br />
                        3) 연락처: 1566-8013
                        <br />
                        4) 이메일: hssong@evidnet.co.kr
                    </div>
                    <br />
                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기
                    바랍니다.
                    <br />
                    1) 개인정보침해신고센터 (https://privacy.kisa.or.kr / 국번없이 118)
                    <br />
                    2) 대검찰청 사이버수사과 (https://www.spo.go.kr / 국번없이 1301)
                    <br />
                    3) 경찰청 사이버안전국 (https://cyberbureau.police.go.kr / 국번없이 182)
                    <br />
                </Typography>
                <Typography paragraph>
                    공고일자 2024-09-25 <br />
                    시행일자 2024-09-25
                </Typography>
            </Box>
        </Container>
    );
};

export default KoreanPrivacyPolicy;
