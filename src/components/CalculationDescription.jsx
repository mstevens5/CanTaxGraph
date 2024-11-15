import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

import {Accordion, 
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'

import ArrowDownwardIcon from "../img/arrow_downward_icon.png"

const createTable1 = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, border: 1 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#e0e0e0', fontSize: '2rem', border: 2 }}>
          <TableRow>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Tax Bracket</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Income Range</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Tax Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>0 - $10,000</TableCell>
            <TableCell>10%</TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: '#eeeeee' }}>
            <TableCell>2</TableCell>
            <TableCell>$10,000 - $20,000</TableCell>
            <TableCell>25%</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>3</TableCell>
            <TableCell>Over $20,000</TableCell>
            <TableCell>50%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const createTable2 = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, border: 1 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#e0e0e0', fontSize: '2rem', border: 2 }}>
          <TableRow>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Income Range</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Tax Rate</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Income Earned Within this Bracket</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Taxes Owed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>0 - $10,000</TableCell>
            <TableCell>10%</TableCell>
            <TableCell>$10,000</TableCell>
            <TableCell>$1,000</TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: '#eeeeee' }}>
            <TableCell>$10,000 - $20,000</TableCell>
            <TableCell>25%</TableCell>
            <TableCell>$5,000</TableCell>
            <TableCell>$1,250</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Over $20,000</TableCell>
            <TableCell>50%</TableCell>
            <TableCell>$0</TableCell>
            <TableCell>$0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const createTable3 = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, border: 1 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#e0e0e0', fontSize: '2rem', border: 2 }}>
          <TableRow>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Income Range</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Tax Rate</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Income Earned Within this Bracket</TableCell>
            <TableCell sx={{ fontSize: '1.25rem', fontWeight: 900 }}>Taxes Owed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>0 - $10,000</TableCell>
            <TableCell>10%</TableCell>
            <TableCell>$10,000</TableCell>
            <TableCell>$1,000</TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: '#eeeeee' }}>
            <TableCell>$10,000 - $20,000</TableCell>
            <TableCell>25%</TableCell>
            <TableCell>$10,000</TableCell>
            <TableCell>$2,500</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Over $20,000</TableCell>
            <TableCell>50%</TableCell>
            <TableCell>$80,000</TableCell>
            <TableCell>$40,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const CalculationDescription = () => {
  const cpp_link = 'https://www.canada.ca/en/revenue-agency/services/tax/' + 
    'businesses/topics/payroll/payroll-deductions-contributions/' + 
    'canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html ';
  const ei_link = 'https://www.canada.ca/en/revenue-agency/services/tax/' + 
    'businesses/topics/payroll/payroll-deductions-contributions/' + 
    'employment-insurance-ei/ei-premium-rates-maximums.html';
  return (
    <div className="calculation_description_outline">
      <div className="calculation_description_container">
        <div style={{fontSize:'1.25rem', lineSpacing:'0.1rem'}}>
        The following information contains a summary of the types of taxes 
        being calculated and the way in which they are calculated. In addition 
        there is an explanation on tax credits and whether or not any have been 
        applied to the numbers represented in the graph.
        <br />
        <br />
          <strong>
            **Disclaimer: This project is merely a hobby project for me. I am
            not a tax expert and do not claim to be one. These numbers are, at the 
            very least, accurate enough for comparison purposes. It is important
            to note that these are just baseline numbers and thus do not take 
            into account the plethora of optional tax credits and refunds 
            (tuition, medical epenses, etc)
          </strong>
        <br />
        <br />
          If you have any questions, concerns, or suggestions, please see my 
          portfolio page 
          at <a href="https://www.emjaystevens.com" target="_blank">emjaystevens.com</a> for appropriate contact information
        </div> 
        <br />

        {/****************************************************************** */}
        <Accordion sx={{boxShadow:0}}>
          <AccordionSummary
            expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component={'span'} sx={{width:'100%'}}>
              <div className="calculation_description_title">Types of Taxes </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} >
              <ul>
                <li>
                  <div><span style={{ fontWeight: '900' }}>Federal Income Tax:</span> - Federal government counts this towards its
                    revenue for the year. Everybody pays this.</div>
                </li>
                <li>
                  <div><span style={{ fontWeight: '900' }}>Provincial Income Tax: </span> - Each province counts this towards their own
                    revenue for the year. The amount and the way it is spent differs per
                    province.</div>
                </li>
                <li>
                  <div><span style={{ fontWeight: '900' }}>CPP: </span> - This amount goes into a pool that is managed by the federal
                    government and used to pay residents a fixed amount every month upon
                    retirement.</div>
                </li>
                <li>
                  <div><span style={{ fontWeight: '900' }}>EI: </span> - Similar to CCP except this money is used to pay residents who
                    apply for unemployment benefits upon being laid off, etc.</div>
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <br />

        {/****************************************************************** */}
        <Accordion sx={{boxShadow:0}}>
          <AccordionSummary
            expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component={'span'} sx={{width:'100%'}}>
              <div className="calculation_description_title">How are Taxes Calculated?</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} >
              <h3> Income Tax</h3>
              <div> Income tax  is calculated by multiple income earned within each tax
                bracket by the tax rate of that bracket. Let's look at a simple example
                using the following tax brackets:
              </div>
              <br />

              {createTable1()}
              <br />
              <div> <strong style={{marginRight:'1rem'}}>Example #1:</strong> Our Income for the year was $15,000. We earned $10,000 
                in the first tax bracket, $5,000 in the second tax
                bracket, and $0 in the third tax bracket. Let's add two additional columns
                to calculate our taxes owed per bracket:
              </div>
              <br />
              {createTable2()}
              <br />
              <div>If we add our taxes owed, this brings our total taxes owed 
                to <strong>$2,250.</strong>
              </div>
              <br />

              <div><strong style={{marginRight:'1rem'}}>Example #2: </strong>
                Our Income for the year was $100,000. We earned $10,000 in the first 
                tax bracket, $10,000 in the second tax bracket, and $80,000 in the 
                third tax bracket. Let's add two additional columns to calculate our 
                taxes owed per bracket:
              </div>
              <br />
              {createTable3()}
              <br />
              <div>If we add our taxes owed, this brings our total taxes owed to 
                <strong>$43,500.</strong>
              </div>
              <br />

              <h3> CPP </h3>
              <div> Here is a summary of the calcuation neede to determine your 
                CPP contribution amount:  
                <ul>
                  <li>
                    <span style={{fontFamily:"Courier"}}> 
                      Contribution Amount = (Income - basic exemption amount) * contribution rate. 
                    </span>
                  </li>
                  <li>
                    Keep in mind there is a maximum contribution amount per year. Nobody
                    pays more than this amount under any circumstances.
                  </li>
                </ul>
              </div>
              <div> As an example, let's assume the year is 2022, and your income is 
                $60,000. This means your contribution amount will be 
                <span style={{fontFamily:"Courier"}}> 
                  (60,000 - 3500) * 5.7% = <strong> $3220.5 </strong>
                </span>
              </div>
              <br />
              <div>
              For a list of CPP basic exemption amount and contributions rates, 
              see <a href={cpp_link} target="_blank">here </a>
              </div>
              <br />
              

              <h3> EI </h3>
              <div>
              Here is a summary of the calcuation neede to determine your 
              EI premium amount: 
              <ul>
                <li>
                  <span style={{fontFamily:"Courier"}}> 
                    Employee premium = Income * EI premium rate
                  </span>
                </li>
                <li>
                  There is a maximum amount each year.
                </li>
              </ul>
              <br />
              <div>
                For a list of EI premium rates, 
                see <a href={ei_link} target="_blank">here </a>
              </div>
              <br />
              **Quebec has its own rates.
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <br />

        {/****************************************************************** */}
        <Accordion sx={{boxShadow:0}}>
          <AccordionSummary
            expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component={'span'} sx={{width:'100%'}}>
              <div className="calculation_description_title">
                Tax Credits and Refunds
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} >
              <h3> Federal Tax Credits</h3>
              <div>
                To simplify things, and to create a universal baseline, the only tax 
                credit being used is the <strong>Basic Personal Amount (BPA).
                </strong>
              </div>
              <br />
              <div>
                Basic Personal Amount is considered a non-refundable tax credit. 
                This means that this value is used to reduce income tax owed, with 
                the caveat that taxes cannot be reduced below zero. So, at best, 
                BPA can be used to reduce your income taxes to zero.
              </div>
              <br />
              <div>
                In order to calculate your tax credit from the BPA you must simply 
                multiply the BPA for the given year by the lowest income tax bracket 
                of the same year. For example, in 2018 the federal BPA was $11,809 and 
                the tax rate of the lowest tax bracket was 15%. So the BPA tax credit 
                for this year is at most $1771.35 (11,809 * 0.15). 
                <strong>In this example, the simplest way of thinking about the BPA 
                  tax credit is that you essentially do not have to pay taxes for the 
                  first $11,809 of your income.
                </strong>
              </div>
              <br />
              <div style={{border: '1px solid black'}}>
                <strong >*Note:</strong> Starting in 2020, the BPA amount has changed slightly 
                (although the calculation is the same). Here is a summary of 
                the changes:
              </div>
              <ul>
                <li>
                There is an upperbound and lowerbound BPA. 
                (the difference between these values is very minor)
                </li>
                <li>
                  The upperbound is applied to everyone that makes a yearly 
                  income up to the amount of the fourth income tax bracket 
                  (the lower bound of this bracket)
                </li>
                <li>
                  The BPA amount is lowered evenly as your yearly income 
                  approaches the fifth tax bracket, resulting in the 
                  lowerbound BPA.
                </li>
                <li>
                  As an example, in 2024 the BPA amount ranged from 
                  $14156 to $15705. Considering the lowest tax bracket’s tax 
                  rate was 15%, this results in a minimum tax credit of $2123.4 
                  and a maximum tax credit of  $2355.75.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default CalculationDescription