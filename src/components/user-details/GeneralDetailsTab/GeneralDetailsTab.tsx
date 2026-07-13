import { DetailSection } from '@/components/user-details/DetailSection';
import type { Guarantor, UserDetail } from '@/types/user';
import detailStyles from '@/components/user-details/DetailSection/DetailSection.module.scss';
import styles from './GeneralDetailsTab.module.scss';

interface GeneralDetailsTabProps {
  user: UserDetail;
}

function guarantorItems(guarantor: Guarantor) {
  return [
    { label: 'Full Name', value: guarantor.fullName },
    { label: 'Phone Number', value: guarantor.phoneNumber },
    { label: 'Email Address', value: guarantor.emailAddress },
    { label: 'Relationship', value: guarantor.relationship },
  ];
}

export function GeneralDetailsTab({ user }: GeneralDetailsTabProps) {
  return (
    <div className={styles.content}>
      <DetailSection
        title="Personal Information"
        items={[
          { label: 'Full Name', value: user.fullName },
          { label: 'Phone Number', value: user.phoneNumber },
          { label: 'Email Address', value: user.email },
          { label: 'BVN', value: user.bvn },
          { label: 'Gender', value: user.gender },
          { label: 'Marital Status', value: user.maritalStatus },
          { label: 'Children', value: user.children },
          { label: 'Type of Residence', value: user.typeOfResidence },
        ]}
      />

      <DetailSection
        title="Education and Employment"
        items={[
          { label: 'Level of Education', value: user.levelOfEducation },
          { label: 'Employment Status', value: user.employmentStatus },
          { label: 'Sector of Employment', value: user.sectorOfEmployment },
          { label: 'Duration of Employment', value: user.durationOfEmployment },
          { label: 'Office Email', value: user.officeEmail },
          { label: 'Monthly Income', value: user.monthlyIncome },
          { label: 'Loan Repayment', value: user.loanRepayment },
        ]}
      />

      <DetailSection
        title="Socials"
        items={[
          { label: 'Twitter', value: user.socials.twitter },
          { label: 'Facebook', value: user.socials.facebook },
          { label: 'Instagram', value: user.socials.instagram },
        ]}
      />

      <section className={detailStyles.section}>
        <h3 className={detailStyles.title}>Guarantor</h3>
        {user.guarantors.map((guarantor, index) => (
          <dl
            key={guarantor.emailAddress}
            className={`${detailStyles.grid} ${index > 0 ? styles.guarantorEntry : ''}`}
          >
            {guarantorItems(guarantor).map((item) => (
              <div key={item.label} className={detailStyles.item}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ))}
      </section>
    </div>
  );
}
