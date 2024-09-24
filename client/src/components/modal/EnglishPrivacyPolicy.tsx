import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

const EnglishPrivacyPolicy: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h3" component="h2" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    EVIDNET Co., Ltd. (hereinafter referred to as "the Company") complies with the
                    privacy protection regulations stipulated in relevant laws, including the Act on
                    Promotion of Information and Communications Network Utilization and Information
                    Protection, the Personal Information Protection Act, the Act on Protection of
                    Communications Secrets, and the Telecommunications Business Act, which must be
                    adhered to by information and communications service providers. The Company is
                    committed to protecting user rights by establishing a privacy policy in
                    accordance with these laws.
                </Typography>
                <Typography variant="body1" paragraph>
                    This privacy policy applies to the use of the Company’s "website
                    (https://www.evix-dct.com)" (hereinafter referred to as 'the Service,' including
                    the website and applications) and contains the following information.
                </Typography>

                {/* Article 1 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 1: Items of Personal (Sensitive) Information Collected and Collection
                    Methods
                </Typography>
                <Typography variant="body1" paragraph>
                    1. The Company collects the following minimum personal information as required
                    fields for membership registration, identity verification, smooth customer
                    consultation, document verification, and provision of various services :
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            Members: [General Personal Information] Name, Email, Password, Mobile
                            Number, Affiliation, Job Title
                        </li>
                        <li>
                            Paid Members: [General Personal Information] Name, Email, Password,
                            Mobile Number, Affiliation, Job Title; Paid members will also provide
                            payment information (Cardholder Name, Card Number, Expiration Date,
                            First 2 Digits of Card Password, CVC, Signature, Payment Amount, Account
                            Information), Business Registration Certificate.
                        </li>
                    </ol>
                    2. During the process of using the service or handling service-related tasks,
                    the following information may be automatically generated or additionally
                    collected:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            Service usage records, access logs, cookies, IP address, device unique
                            identifiers (Device ID or IMEI), records of fraudulent use, advertising
                            identifiers.
                        </li>
                    </ol>
                    3. Methods of Collecting Personal Information: The Company collects personal
                    information through the following methods:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            Homepage, screens within the service, written forms, fax, phone,
                            bulletin boards, inquiries.
                        </li>
                        <li>Collection through generation information collection tools.</li>
                        <li>
                            Information collection from partner hospitals based on member consent.
                        </li>
                    </ol>
                </Typography>

                {/* Article 2 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 2: Purpose of Collection and Use of Personal (Sensitive) Information
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Membership Registration and Management: Verification of identity, maintenance
                    and management of membership services, identification and authentication,
                    various notifications, prevention of fraudulent use by bad members, restriction
                    of use for members violating terms of service, confirmation of intention to
                    withdraw from membership. <br />
                    2. Contract Fulfillment for Service Provision: Providing content and specific
                    services through services (Web, App, etc.). <br />
                    3. Service Improvement and Complaint Handling: Identity verification of
                    complainants, confirmation of complaints, contact for fact-finding, record
                    retention for dispute resolution, handling complaints, notification of handling
                    results. <br />
                    4. Development of New Services and Marketing/Advertising Use: Development of new
                    services and customized services, provision of services and advertisements based
                    on statistical characteristics, validation of service effectiveness, provision
                    of event information and participation opportunities, provision of promotional
                    information, frequency analysis of access, statistics on members’ service usage.
                </Typography>

                {/* Article 3 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 3: Purpose of Collection and Use of Personal (Sensitive) Information
                </Typography>
                <Typography variant="body1" paragraph>
                    The Company uses personal information within the scope notified in "2. Purpose
                    of Collection and Use of Personal Information" and does not disclose or use
                    personal information externally without prior consent from the user, except in
                    cases where consent for collection and use of personal information is given.
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Provision of Personal and Medical Information to Third Parties: The Company
                    uses the information of members and partner hospitals within the scope stated in
                    "Items of Personal Information Collection and Purpose of Use" and does not
                    disclose personal information externally without prior consent. However,
                    personal information may be provided to third parties in the following cases:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            In the case of using paid services, the following items are provided to
                            the payment agency within the service:
                            <ul>
                                <li>
                                    [General Personal Information] Payment Information (Cardholder
                                    Name, Card Number, Expiration Date, First 2 Digits of Card
                                    Password, CVC, Signature, Payment Amount, Account Information),
                                    Business Registration Certificate.
                                </li>
                                <li>
                                    [Sensitive Information]
                                    <ol>
                                        <li>
                                            Where required by law or unavoidable for compliance with
                                            legal obligations.
                                        </li>
                                        <li>
                                            When required by investigative agencies for
                                            investigation purposes following the procedures
                                            prescribed by relevant laws.
                                        </li>
                                        <li>
                                            When providing personal information in a form that does
                                            not allow for identification of specific individuals for
                                            statistical or research purposes.
                                        </li>
                                    </ol>
                                </li>
                            </ul>
                        </li>
                    </ol>
                    2. Entrustment of Personal Information Processing:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            The Company may entrust the processing of personal information to
                            enhance services. When entrusting tasks, the Company informs the user
                            and obtains consent, and the same applies if any of the matters change.
                            The personal information entrusted to the following data processors is
                            for better service provision:
                        </li>
                        <ul>
                            <li>
                                [PayPal Co., Ltd.]
                                <ul>
                                    <li>Processing and acting as a payment agent.</li>
                                    <li>
                                        Until membership withdrawal or termination of the trust
                                        contract.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <li>
                            The Company entrusts personal information to provide stable service and
                            the latest technology to users, and stores the personal information
                            obtained or generated from users on a database server (physical storage
                            location: Korea) held by OCI (Oracle Cloud Infrastructure). OCI only
                            manages the physical server and does not have access to users' personal
                            information.
                            <ol>
                                <li>
                                    Items: Service usage records or collected personal information.
                                </li>
                                <li>Method: Transmitted over the network.</li>
                                <li>Retention Period: Until changes in cloud service usage.</li>
                            </ol>
                        </li>
                        <li>
                            The Company specifies in the contract matters concerning prohibition of
                            processing personal information for purposes other than the entrusted
                            task, technical and managerial protective measures, restrictions on
                            re-entrustment, management and supervision of the trustee, and liability
                            for damages. The Company supervises whether the trustee safely processes
                            personal information. In the event that the contents of the entrusted
                            task or the trustee changes, this will be disclosed without delay
                            through this privacy policy.
                        </li>
                    </ol>
                </Typography>

                {/* Article 4 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 4: Retention and Use Period of Personal (Sensitive)
                </Typography>
                <Typography variant="body1" paragraph>
                    Information Personal information of members is used from the time of membership
                    registration until withdrawal. When the purpose of collection and use of
                    personal information is achieved, it is promptly destroyed. However, the
                    following information will be retained for the periods specified below for the
                    reasons stated:
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Retention Reasons According to Internal Policies of the Company:
                    <ol type="a" style={{margin : 0}}>
                        <li>Records of fraudulent use: Prevention of fraudulent use (1 year).</li>
                        <li>
                            Inquiries/partnership details (if separate consent is obtained from the
                            user): Handling member consultations (1 year).
                        </li>
                        <li>
                            Membership withdrawal records: For handling complaints, etc. (30 days
                            from the withdrawal date).
                        </li>
                    </ol>
                    2. Retention Reasons According to Relevant Laws:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            Records regarding contract or withdrawal of application: Consumer
                            Protection Act in Electronic Commerce (5 years).
                        </li>
                        <li>
                            Records regarding payment and supply of goods: Consumer Protection Act
                            in Electronic Commerce (5 years).
                        </li>
                        <li>
                            Records regarding consumer complaints or dispute resolution: Consumer
                            Protection Act in Electronic Commerce (3 years).
                        </li>
                        <li>
                            Records regarding display/advertising: Consumer Protection Act in
                            Electronic Commerce (6 months).
                        </li>
                        <li>
                            All transaction records and supporting documents stipulated by tax laws:
                            National Tax Basic Act, Corporate Tax Act (5 years).
                        </li>
                        <li>
                            Records regarding electronic financial transactions: Electronic
                            Financial Transactions Act (5 years).
                        </li>
                        <li>
                            Records regarding website visits: Communications Privacy Protection Act
                            (3 months).
                        </li>
                    </ol>
                    3. In cases where the non-face-to-face medical service payment is completed as
                    per paragraph 2, the related patient list and medical records will be retained
                    for 5 years, and the staff of the medical institution where treatment was
                    provided can query the related information during that period.
                </Typography>

                {/* Article 5 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 5: Procedures and Methods for Destruction of Personal
                </Typography>
                <Typography variant="body1" paragraph>
                    Information The user's personal information will be destroyed without delay once
                    the purpose of collection and use is achieved. The Company's procedures and
                    methods for destroying personal information are as follows:
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Destruction Procedures: The Company records and manages matters regarding the
                    destruction of personal information, and the destruction is carried out under
                    the responsibility of the personal information protection officer, who verifies
                    the destruction results. The Company may exceptionally not destroy the user's
                    personal information if required to retain it by other laws.
                </Typography>
                <Typography variant="body1" paragraph>
                    2. Destruction Methods: Personal information stored on paper or other recording
                    media is shredded or incinerated. Personal information stored in electronic file
                    formats is permanently deleted using methods that cannot be restored (or
                    technical methods that do not allow for the reconstruction of records).
                </Typography>
                <Typography variant="body1" paragraph>
                    3. Retention Method for Non-Destruction Information: If the Company retains
                    personal information instead of destroying it as required by law, the personal
                    information or personal information files are stored and managed separately from
                    other personal information. The Company does not use the personal information
                    moved to a separate database for purposes other than retention unless required
                    by law.
                </Typography>

                {/* Article 6 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 6: Rights of Users and Legal Representatives and How to Exercise Them
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Users and legal representatives can inquire, modify, or request membership
                    withdrawal of their registered personal information at any time.
                </Typography>
                <Typography variant="body1" paragraph>
                    2. Personal information that has been deleted at the request of the user or
                    legal representative is processed according to the provisions of Article 4 and
                    is not used or accessed for other purposes.
                </Typography>

                {/* Article 7 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 7: Installation/Operation and Refusal of Automatic Personal
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Purpose of Using Cookies: Cookies are used to understand user visits and
                    usage patterns on the Company's services and websites, popular search terms,
                    security access status, user scale, etc., to provide optimized information to
                    users. <br />
                    2. Installation/Operation and Refusal of Cookies:
                    <ol type="a" style={{margin : 0}}>
                        <li>
                            Users have the option to allow or deny the installation of cookies.
                            Users can set options in their web browsers to accept all cookies,
                            confirm each time a cookie is saved, or deny all cookies. However, if
                            cookies are denied, some services that require login may have difficulty
                            being used.
                        </li>
                        <li>
                            To refuse cookie settings, users can select options in their web browser
                            to allow all cookies, confirm each time cookies are saved, or deny all
                            cookies.
                        </li>
                    </ol>
                </Typography>

                {/* Article 8 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 8: Technical/Managerial Protective Measures for Personal
                </Typography>
                <Typography variant="body1" paragraph>
                    Information The Company implements the following technical/managerial measures
                    to ensure the security of users' personal information and prevent loss, theft,
                    leakage, alteration, or damage:
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Users' personal information is protected by passwords, and important data is
                    protected through separate security functions using file encryption or file
                    locking. <br />
                    2. The Company takes measures to prevent damage from computer viruses by using
                    antivirus programs. The antivirus program is updated periodically, and in case
                    of sudden virus outbreaks, it provides updates immediately to prevent
                    infringement of personal information. <br />
                    3. To prepare for external intrusions such as hacking, the Company uses
                    intrusion prevention systems and vulnerability analysis systems on each server
                    to ensure security. <br />
                    4. The Company restricts access to personal information to a minimal number of
                    personnel and emphasizes compliance with this policy through regular training
                    for employees who handle personal information, such as those performing
                    marketing tasks directly related to users, personal information protection
                    officers, and those engaged in personal information management tasks. However,
                    the Company is not responsible for damages caused by the user's negligence or
                    accidents in areas not managed by the Company, even if the Company has fulfilled
                    its obligations for personal information protection. <br />
                </Typography>

                {/* Article 9 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 9: Other Matters
                </Typography>
                <Typography variant="body1" paragraph>
                    1. This "Privacy Policy" does not apply to the collection of personal
                    information by websites linked to the Company's internet services. <br />
                    2. When requesting correction of personal information, the user's personal
                    information will not be used or provided until the correction is completed to
                    ensure accurate use and provision of personal information.
                </Typography>

                {/* Article 10 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 10: Changes to the Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    In the event of changes to the privacy policy, the Company will continuously
                    disclose the changes, effective date, and details of the changes through the
                    "Service" so that users can easily be informed.
                </Typography>

                {/* Article 11 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 11: Personal Information Protection Officer and Contact Information
                </Typography>
                <Typography variant="body1" paragraph>
                    To protect users' personal information and handle any complaints related to
                    personal information protection arising from the use of the Company's services,
                    the following officer is designated and operated. Please feel free to contact us
                    for prompt and sufficient responses.
                </Typography>

                <Typography variant="body1" paragraph>
                    <div style={{ fontWeight: 'bold' }}>
                        Personal Information Protection Officer:
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Name: </span>Song Haesun{' '}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Affiliation: </span> evidnet Co., Ltd.
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Contact: </span> +82-1566-8013
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Email: </span> hssong@evidnet.co.kr
                    </div>
                </Typography>

                {/* Article 12 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    For any inquiries or consultations regarding personal information infringement,
                    please contact the following institutions:
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Personal Information Infringement Reporting Center in Republic of Korea
                    (https://privacy.kisa.or.kr / Call +82-118) <br />
                    2. Cyber Investigation Division of the Supreme Prosecutor’s Office in Republic
                    of Korea (https://www.spo.go.kr / Call +82-1301) <br />
                    3. Cyber Safety Bureau of the National Police Agency in Republic of Korea
                    (https://cyberbureau.police.go.kr / Call +82-182) <br />
                </Typography>
            </Box>
        </Container>
    );
};

export default EnglishPrivacyPolicy;
