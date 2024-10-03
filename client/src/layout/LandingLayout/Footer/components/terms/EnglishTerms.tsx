import React from 'react';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';

const EnglishTerms: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h3" component="h2" gutterBottom>
                    Terms of Use
                </Typography>
				<Box mb={4}>
					{/* Article 1 */}
					<Typography variant="h5" component="h2" gutterBottom>
						Article 1 (Purpose)
					</Typography>
					<Typography variant="body1" paragraph>
						These Terms of Use (hereinafter referred to as the "Terms") are intended to
						specify the conditions of membership, use, and other necessary matters related
						to the use of Evix-DCT services (hereinafter referred to as "Evix-DCT" or the
						"Service") provided by EvidNet Co., Ltd. (hereinafter referred to as the
						"Company") to members and affiliated hospitals.
					</Typography>
				</Box>
                {/* Article 2 */}
				<Box my={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 2 (Definitions)
					</Typography>
					<Typography variant="body1" paragraph>
                    1. The "Service" refers to all services provided by the Company, regardless of
                    the devices used (including various wired and wireless devices such as PCs,
                    mobile devices, etc.). <br />
					</Typography>
					<Typography variant="body1" paragraph>
                    2. "Member" refers to an individual who uses the service provided by the Company
                    and receives continuous information under these Terms.
                    </Typography>
					<Typography variant="body1" paragraph>
                    3. "Paid Member" refers to a member who pays a legitimate fee for a paid service
                    and is granted the corresponding authority.
                    </Typography>
					<Typography variant="body1" paragraph>
                    4. "Email" refers to the unique email address set by the member and approved by
                    the Company to identify the member, receive information, and use the service.
                    </Typography>
					<Typography variant="body1" paragraph>
                    5. "Password" refers to the combination of letters and numbers set by the member
                    to protect their privacy and confirm their identity as a registered member.
                    </Typography>
					<Typography variant="body1" paragraph>
                    6. "Authentication Number or Code" refers to the number used by the member to
                    verify their identity, received through email.
                    </Typography>
					<Typography variant="body1" paragraph>
                    7. "Post" refers to information in various formats (symbols, text, sound, video,
                    etc.) such as writing, photos, videos, and files provided by the member or
                    received with the member's consent and stored, managed, or posted by the
                    Company.
                	</Typography>
				</Box>
                {/* Article 3 */}
				<Box my={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 3 (Posting and Amendment of the Terms)
                </Typography>
                <Typography variant="body1" paragraph>
                    1. The Company will post these Terms on the membership registration page for
                    easy access by members.
					</Typography>
					<Typography variant="body1" paragraph>
                    2. The Company may amend these Terms within the scope of compliance with
                    relevant laws such as the "Act on Consumer Protection in Electronic Commerce,"
                    "Act on the Regulation of Terms and Conditions," and "Information and
                    Communications Network Act."
					</Typography>
					<Typography variant="body1" paragraph>
                    3. If the Company amends the Terms, the reason and effective date of the
                    amendment will be announced at least 7 days prior to the effective date. If the
                    amendment is disadvantageous to the member, the Company will notify members at
                    least 30 days in advance through emails, electronic notices, or pop-ups. The
                    Company is not responsible for any damages caused by members not being informed
                    of the changes despite such notifications.
					</Typography>
					<Typography variant="body1" paragraph>
                    4. If a member does not express any objection to the revised Terms within the
                    period specified in the notification, it is deemed that the member agrees to the
                    amended Terms. Members may request to terminate their membership if they do not
                    agree with the amended Terms.
                	</Typography>
				</Box>

                {/* Article 4 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 4 (Other Guidelines and Relationship with Laws)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company may have separate terms of use or policies for specific services,
						and in case of conflict with these Terms, the separate terms or policies shall
						prevail.
					</Typography>
					<Typography variant="body1" paragraph>
						2. Matters not specified in these Terms shall follow relevant laws and general
						business practices.
						
					</Typography>
				</Box>

                {/* Article 5 */}
				<Box mb={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 5 (Establishment of the Use Agreement)
                </Typography>
                <Typography variant="body1" paragraph>
                    1. The service use agreement is established when an individual (hereinafter
                    referred to as the "Applicant") agrees to the Terms, completes the registration
                    form with their information (email, password, name, contact information,
                    company, position, etc.), and the Company approves the registration.
					</Typography>
                    
					<Typography variant="body1">
                    2. The Company generally approves the registration, but may reject or terminate
                    the use agreement under the following circumstances:
					</Typography>
                    <ol type="a" style={{ margin: 0 }}>
                        <li>
                            If the applicant has previously lost membership according to these
                            Terms.
                        </li>
                        <li>
                            If the applicant uses another person's name or contact information or
                            registers with a duplicate email or ID.
                        </li>
                        <li>
                            If the applicant provides false information or does not complete the
                            registration form.
                        </li>
                        <li>
                            If the applicant disrupts the service or uses it for illegal purposes.
                        </li>
                        <li>If the applicant is under 14 years old.</li>
                        <li>If the applicant violates other laws or acts against public morals.</li>
                    </ol>
				</Box>

                {/* Article 6 */}
				<Box mb={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Article 6 (Termination of the Use Agreement)
                </Typography>
                <Typography variant="body1" paragraph>
                    1. Members may request to terminate the use agreement at any time through the
                    [My Page] menu.
					</Typography>
                    <Typography variant="body1" paragraph>
                    2. The Company will process termination requests without undue delay.
                    </Typography>
					<Typography variant="body1" paragraph>
                    3. After termination, the member may be restricted from re-registering for a
                    certain period.
					</Typography>
                    <Typography variant="body1">
                    4. The Company may limit or terminate a member’s membership if:
					</Typography>
                    <ol type="a" style={{ margin: 0, marginBottom: '1rem' }}>
                        <li>
                            The reasons for rejecting membership under Article 5, Clause 2, are
                            confirmed.
                        </li>
                        <li>The member infringes the rights of the Company or others.</li>
                        <li>The member violates these Terms or engages in illegal activities.</li>
                    </ol>
					<Typography variant="body1" paragraph>
                    5. The Company is not responsible for any damages incurred due to voluntary or
                    involuntary termination.
					</Typography>                
				</Box>


                {/* Article 7 */}
				<Box mb={4}>
                	<Typography variant="h5" component="h2" gutterBottom>
                    Article 7 (Changes to Member Information)
                	</Typography>
                	<Typography variant="body1" paragraph>
                    1. Members can view and modify their personal information through the [My Page]
                    menu, except for items required for service management such as the real name and
                    ID.
					</Typography>
                    <Typography variant="body1" paragraph>
                    2. If there are any changes in the registration details, members must update the
                    information online or notify the Company by email.
					</Typography>
                    <Typography variant="body1" paragraph>
                    3. The Company is not responsible for any disadvantages caused by the member’s
                    failure to update their information.
                	</Typography>
				</Box>


                {/* Article 8 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 8 (Notifications to Members)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company may send notifications to members via email, SMS, electronic
						messages, or other means.
						<br />
						2. For notifications to all members, the Company may post a notice on the
						website or within the service for at least 7 days.
						<br />
					</Typography>
				</Box>

                {/* Article 9 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 9 (Company’s Obligations)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company shall not engage in illegal or immoral acts and shall strive to
						provide continuous and stable services.
					</Typography>
					<Typography variant="body1" paragraph>
						2. The Company will establish and adhere to a privacy policy to protect personal
						information, as required by law.
					</Typography>
					<Typography variant="body1" paragraph>
						3. The Company will promptly handle members' legitimate complaints and inform
						them of the processing schedule if immediate resolution is not possible.
					</Typography>
					<Typography variant="body1" paragraph>
						4. The Company complies with all legal obligations.
					</Typography>
				</Box>

                {/* Article 10 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 10 (Member’s Obligations)
					</Typography>
					<Typography variant="body1" paragraph>
                    1. Members must comply with the laws, these Terms, and any other policies or
                    notices from the Company and shall not interfere with the Company’s operations.
                    </Typography>
					<Typography variant="body1">
                    2. Members are prohibited from the following:
					</Typography>
                    <ol type="a" style={{ margin: 0, marginBottom: '1rem' }}>
                        <li>Providing false information during registration or service use.</li>
                        <li>Using another person’s information.</li>
                        <li>Modifying information posted by the Company.</li>
                        <li>Posting unauthorized content (advertisements, software, etc.).</li>
                        <li>
                            Infringing on the intellectual property rights of the Company or others.
                        </li>
                        <li>Posting or transmitting obscene or violent content.</li>
                        <li>
                            Using the service for commercial purposes without the Company’s consent.
                        </li>
                        <li>Engaging in illegal or unfair activities.</li>
                    </ol>
					<Typography variant="body1" paragraph>
                    3. Members must compensate the Company for any damages caused by their violation
                    of these Terms.
                	</Typography>
				</Box>

                {/* Article 11 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 11 (Privacy Protection and Use)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company complies with relevant laws to protect members' personal
						information.
					</Typography>
					<Typography variant="body1" paragraph>
						2. The Company has a privacy policy, which is posted on the initial service
						screen. Detailed information is accessible via a link.
					</Typography>
					<Typography variant="body1" paragraph>
						3. When collecting personal information, the Company informs the member of its
						purpose and obtains their consent.
					</Typography>
					<Typography variant="body1">
						4. The Company may provide personal information to third parties within the
						legal scope if:
					</Typography>
					<ol type="a" style={{ margin: '0 0 1rem 0' }}>
						<li>Requested by law enforcement or other government agencies.</li>
						<li>
							Necessary for verifying illegal activities or violations of the Terms.
						</li>
						<li>Required by other laws.</li>
					</ol>
					<Typography variant="body1" paragraph>
						5. The Company may collect additional personal information with the member’s
						consent, following the law.
					</Typography>
				</Box>

                {/* Article 12 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 12 (Provision and Change of Services)
					</Typography>
					<Typography variant="body1">
						1. The Company provides the following services to members:
					</Typography>
					<ol type="a" style={{ margin: '0 0 1rem 0' }}>
						<li>Software-based services for collecting clinical trial data.</li>
						<li>Any additional services developed or provided through partnerships.</li>
					</ol>
					<Typography variant="body1" paragraph>
						2. The Company may change the service content if necessary and will notify
						members of any changes through the method outlined in Article 8.
					</Typography>
					<Typography variant="body1" paragraph>
						3. The Company may temporarily suspend services for maintenance or other
						technical reasons and will notify members accordingly.
					</Typography>
				</Box>

                {/* Article 13 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 13 (Provision of Information and Advertising)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company may provide information necessary for service use through various
						means, including service screens, email, and SMS.
					</Typography>
					<Typography variant="body1" paragraph>
						2. The Company may display advertisements related to the service on the website,
						app notifications, emails, etc. Members can refuse to receive advertisements via
						email.
					</Typography>
					<Typography variant="body1" paragraph>
						3. If the Company sends information via phone or fax, prior consent from the
						member will be obtained unless it is directly related to a transaction.
                	</Typography>
				</Box>

                {/* Article 14 */}
				<Box mb={4}>
                	<Typography variant="h5" component="h2" gutterBottom>
                    	Article 14 (Responsibility for Research Information)
                	</Typography>
                	<Typography variant="body1" paragraph>
						1. The clinical trial data collected by members will be stored and managed on
						the Company’s cloud server.
					</Typography>
                    <Typography variant="body1" paragraph>
						2. Members are responsible for managing the data and any damages caused by
						negligence, and the Company is not liable for such damages.
					</Typography>
				</Box>

                {/* Article 15 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 15 (Copyright of Posts)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The copyright of posts created by the member belongs to the member.
					</Typography>
					<Typography variant="body1" paragraph>
						2. Members are responsible for any issues arising from their posts and the
						Company is not liable for any damages caused.
					</Typography>
					<Typography variant="body1" paragraph>
						3. By posting, the member grants the Company a free license to use the content.{' '}
					</Typography>
					<Typography variant="body1" paragraph>
						4. The Company may modify, omit, or edit posts for promotional purposes and
						distribute them to partners.
					</Typography>
				</Box>

                {/* Article 16 */}
				<Box mb={4}>
                	<Typography variant="h5" component="h2" gutterBottom>
                    	Article 16 (Ownership of Rights)
                	</Typography>
                	<Typography variant="body1" paragraph>
						1. All intellectual property rights related to the service belong to the
						Company. Members do not acquire any ownership of the service or its content by
						agreeing to these Terms.
					</Typography>
					<Typography variant="body1" paragraph>
						2. Members may use their account and content for personal use and cannot
						transfer or commercialize them without the Company’s consent.
                	</Typography>
				</Box>

                {/* Article 17 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 17 (Limitation of Liability)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company is legally responsible for the goods or services it provides.
					</Typography>
					<Typography variant="body1" paragraph>
						2. Members are legally responsible for the data they collect. The Company only
						provides a service that connects participants in smart clinical trials with the
						members. The Company does not guarantee any services that are not provided
						directly by the Company and is not legally responsible for them.
					</Typography>
					<Typography variant="body1" paragraph>
						3. The Company is not obligated to pre-screen or continuously monitor posts made
						by members, nor is it responsible for the results of such posts.
					</Typography>
					<Typography variant="body1" paragraph>
						4. The Company is not obligated to monitor or take responsibility for the
						services, advertisements, events, or hospital information introduced on the
						Service by third parties. In the case of content that violates the law, the
						third party is responsible for it.
					</Typography>
					<Typography variant="body1" paragraph>
						5. The Company is exempt from responsibility for the provision of services if
						the service cannot be provided due to force majeure events such as natural
						disasters or other uncontrollable circumstances.
					</Typography>
				</Box>

                {/* Article 18 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 18 (Orders and Payments)
					</Typography>
					<Typography variant="body1" paragraph>
						1. Members can make payments for paid services, consultation vouchers, and
						points through the procedures provided by the Company. However, payments by
						minor members must, in principle, be made under the name or with the consent of
						a guardian (legal representative).
					</Typography>
					<Typography variant="body1" paragraph>
						2. If a minor member wishes to use paid services, the guardian (legal
						representative) can cancel the contract unless they consented to the contract at
						the time of formation or approved it later. However, in cases where minors can
						independently enter contracts according to civil law, this does not apply.
					</Typography>
					<Typography variant="body1" paragraph>
						3. The member is fully responsible for the input of payment information and any
						related liabilities or disadvantages.
					</Typography>
					<Typography variant="body1" paragraph>
						4. If the member does not make a payment within a certain period after entering
						into a contract or applying for service use, the Company may cancel the contract
						without the member’s consent.
					</Typography>
					<Typography variant="body1" paragraph>
						5. The Company provides a means for members to check their payment details
						through the My Page section and provides instructions on how to cancel orders
						and the related procedures
					</Typography>
					<Typography variant="body1" paragraph>
						6. The Company may verify whether the payment method used by the member is
						authorized and may suspend or cancel the contract or service use until
						verification is completed.
					</Typography>
					<Typography variant="body1" paragraph>
						7. For the provision of paid services or products, the Company may provide or
						entrust necessary member information to payment intermediaries and partner
						hospitals within the scope necessary for payment processing.
					</Typography>
				</Box>

                {/* Article 19 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 19 (Order Cancellation and Withdrawal)
					</Typography>
					<Typography variant="body1" paragraph>
                    1. Members who enter into a contract with the Company for paid services,
                    consultation vouchers, or point usage may cancel the order within 7 days of the
                    order date. 
					</Typography>
					<Typography variant="body1">
                    2. Members cannot cancel the order if any of the following apply, even against
                    the Company's will:
					</Typography>
                    <ol type="a" style={{ margin: '0 0 1rem 0' }}>
                        <li>If the member has partially used the service.</li>
                        <li>
                            In other cases where cancellation is restricted for transaction security
                            reasons under the enforcement decree of the "Consumer Protection in
                            Electronic Commerce Act."
                        </li>
                    </ol>
					<Typography variant="body1" paragraph>
                    3. If cancellation is not allowed under Clause 2, the Company must provide clear
                    guidance to the member to ensure that their right to cancel is not hindered. If
                    the Company fails to provide such guidance, members may still cancel their order
                    despite the restrictions in Clause 2.
                    </Typography>
					<Typography variant="body1" paragraph>
                    4. Notwithstanding Clauses 1 and 2, if the content of the goods or services
                    differs from the advertisement or if the contract is not properly fulfilled,
                    members may cancel the order within three months of receiving the goods or
                    services or within 30 days of discovering the issue.
                    </Typography>
					<Typography variant="body1" paragraph>
                    5. In case of cancellation, the member must bear the costs of returning the
                    goods or services, except in cases where the cancellation is due to differences
                    in the content or fulfillment of the contract. In such cases, the Company will
                    cover the return costs
                    </Typography>
					<Typography variant="body1" paragraph>
                    6. The Company is not obligated to refund any services, content, or goods
                    obtained as gifts, promotions, or through free offers that were not paid for
                    directly by the member.
                	</Typography>
				</Box>

                {/* Article 20 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 20 (Compensation for Damages)
					</Typography>
					<Typography variant="body1" paragraph>
						1. The Company and members must compensate each other for any damages caused by
						intentional or negligent actions in relation to the use of the Service
					</Typography>
					<Typography variant="body1" paragraph>
						2. However, the Company is not liable for any damages related to the use of free
						services, except as stipulated in the Privacy Policy.
					</Typography>
				</Box>

                {/* Article 21 */}
				<Box mb={4}>
                	<Typography variant="h5" component="h2" gutterBottom>
                    	Article 21 (Service Restrictions)
                	</Typography>
                	<Typography variant="body1" paragraph>
                    1. If a member violates these Terms or interferes with the normal operation of
                    the Service, the Company may restrict the member's use of the Service in stages,
                    such as issuing warnings, temporarily suspending service, or permanently banning
                    the member.
					</Typography>
                    <Typography variant="body1" paragraph>
                    2. Despite Clause 1, in cases of identity theft, payment fraud, telephone number
                    misuse, provision of illegal programs, service disruption, illegal
                    communications and hacking, distribution of malicious programs, or exceeding
                    access rights, the Company may immediately and permanently suspend the member's
                    service.
                    </Typography>
					<Typography variant="body1">
                    3. The Company may restrict service use if the following actions are discovered:
					</Typography>
                    <ol type="a" style={{ margin: '0 0 1rem 0' }}>
                        <li>
                            Registering false information or using another person's ID, password,
                            phone number, name, birth date, or other personal information, or
                            trading or providing IDs to others.
                        </li>
                        <li>
                            Transmitting or distributing information, text, images, sound, or videos
                            that are vulgar, obscene, or violate others' reputation or privacy.
                        </li>
                        <li>
                            Harassing or threatening other users, or persistently causing discomfort
                            or inconvenience to a specific user.
                        </li>
                        <li>
                            Modifying the client program, hacking the Company's servers, or
                            arbitrarily changing part or all of the Company's website or posted
                            information.
                        </li>
                        <li>
                            Using information obtained through the Service for purposes other than
                            service use, or providing such information to third parties without
                            prior approval from the Company.
                        </li>
                        <li>
                            Impersonating Company staff, employees, or associates, or deliberately
                            disrupting normal service operation.
                        </li>
                        <li>
                            Posting content unrelated to the service provided by the Company or
                            content related to competing services.
                        </li>
                        <li>
                            Complying with correction requests from public institutions like the
                            Korea Communications Standards Commission.
                        </li>
                        <li>
                            Violating these Terms, other regulations set by the Company, or laws
                            objectively judged to be related to criminal acts.
                        </li>
                    </ol>
					<Typography variant="body1" paragraph>
						4. If a member does not log in for more than three months, the Company may
						restrict service use for the purpose of protecting member information and
						enhancing operational efficiency.
					</Typography>
                    <Typography variant="body1" paragraph>
						5. The specific conditions and details of service restrictions are determined by
						the Company’s restriction policy and the individual service’s operational
						policy.
                    </Typography>
                    <Typography variant="body1" paragraph>
						6. If service use is restricted or the contract is terminated in accordance with
						this Article, the Company will notify the member under Article 8.
                    </Typography>
                    <Typography variant="body1" paragraph>
						7. Members may file objections to the service restrictions according to the
						procedures set by the Company. If the objection is deemed valid, the Company
						will promptly restore the member’s service access.
                	</Typography>
				</Box>

                {/* Article 22 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 22 (Governing Law and Jurisdiction)
					</Typography>
					<Typography variant="body1" paragraph>
						1. Lawsuits arising between the Company and members or partner hospitals are
						governed by the laws of the Republic of Korea.
					</Typography>
					<Typography variant="body1" paragraph>
						2. Disputes between the Company and members will be subject to the jurisdiction
						of the courts under the Civil Procedure Act.
					</Typography>
				</Box>

                {/* Article 23 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Article 23 (Miscellaneous Provisions)
					</Typography>
					<Typography variant="body1" paragraph>
						1. If any provision of these Terms is found invalid or unenforceable, the
						remaining provisions will remain in effect. The titles of the articles are for
						reference only and do not limit the scope or extent of the provisions. The
						Company's failure to act on any violation of these Terms does not constitute a
						waiver of its right to act on similar or subsequent violations.
					</Typography>
					<Typography variant="body1" paragraph>
						2. In case of any discrepancies between the English and Korean versions of these
						Terms, the Korean version will prevail.
					</Typography>
				</Box>

                {/* Article 24 */}
				<Box mb={4}>
					<Typography variant="h5" component="h2">
						The Company will continuously display these Terms and any changes through the
						Service for members to easily access.
					</Typography>
				</Box>
            </Box>
        </Container>
    );
};

export default EnglishTerms;
