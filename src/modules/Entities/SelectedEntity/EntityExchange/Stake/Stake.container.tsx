import React, { useEffect, useState } from 'react'
import { thousandSeparator } from 'common/utils/formatters'
import * as keplr from 'common/utils/keplr'
import * as Toast from 'common/utils/Toast'
import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Button, Table } from 'common/components/Dashboard'
import { StatsLabel } from './Stake.container.styles'
import {
  changeStakeCellEntity,
  getInflation,
  getTotalStaked,
  getTotalSupply,
  getValidators,
  setSelectedValidator,
} from '../EntityExchange.actions'
import { broadCastMessage } from 'common/utils/keysafe'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import StakingModal from 'common/components/ControlPanel/Actions/StakingModal'
import { selectAPR } from '../EntityExchange.selectors'
interface ValidatorDataType {
  userDid: string
  validatorAddress: string
  validatorLogo: string
  validatorName: {
    text: string
    link: string
  }
  validatorMission: string
  validatorVotingPower: string
  validatorCommission: string
  delegation: string
}

const columns = [
  {
    Header: 'VALIDATOR',
    accessor: 'logo',
  },
  {
    Header: 'NAME',
    accessor: 'name',
    align: 'left',
  },
  {
    Header: 'MISSION',
    accessor: 'mission',
    align: 'left',
  },
  {
    Header: 'VOTING POWER',
    accessor: 'votingPower',
  },
  {
    Header: 'COMMISSION',
    accessor: 'commission',
  },
  {
    Header: 'MY DELEGATION (+REWARDS)',
    accessor: 'delegation',
  },
]

const Stake: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)
  const { validators, Inflation, selectedValidator } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )
  const APR = useSelector(selectAPR)

  const [totalRewards, setTotalRewards] = useState<number>(0)
  const [stakeModalOpen, setStakeModalOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(true)
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [modalTitle, setModalTitle] = useState('My Stake')

  const handleClaimRewards = async (): Promise<void> => {
    const msgs = []
    const fee = {
      amount: [{ amount: String(10000), denom: 'uixo' }],
      gas: String(400000),
    }
    const memo = ''

    if (walletType === 'keysafe') {
      validators
        .filter((validator) => validator.reward)
        .forEach((validator) => {
          msgs.push({
            type: 'cosmos-sdk/MsgWithdrawDelegationReward',
            value: {
              delegator_address: selectedAddress,
              validator_address: validator.address,
            },
          })
        })

      broadCastMessage(
        userInfo,
        userSequence,
        userAccountNumber,
        msgs,
        memo,
        fee,
        () => {
          dispatch(getValidators(selectedAddress))
        },
      )
    } else if (walletType === 'keplr') {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      validators
        .filter((validator) => validator.reward)
        .forEach((validator) => {
          msgs.push({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: MsgWithdrawDelegatorReward.fromPartial({
              delegatorAddress: selectedAddress,
              validatorAddress: validator.address,
            }),
          })
        })

      const payload = {
        msgs,
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee,
        memo,
      }

      try {
        const result = await keplr.sendTransaction(client, address, payload)
        if (result) {
          Toast.successToast(`Transaction Successful`)
        } else {
          // eslint-disable-next-line
          throw 'transaction failed'
        }
      } catch (e) {
        Toast.errorToast(`Transaction Failed`)
      }
      dispatch(getValidators(selectedAddress))
    }
  }

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)
  }

  const handleCloseStakeModal = (): void => {
    setStakeModalOpen(false)
    dispatch(setSelectedValidator(null))

    if (!selectedAddress) {
      return
    }
    dispatch(getValidators(selectedAddress))
  }

  useEffect(() => {
    dispatch(getInflation())
    dispatch(getTotalSupply())
    dispatch(getTotalStaked())
    dispatch(changeStakeCellEntity(null))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!selectedAddress) {
      return
    }
    dispatch(getValidators(selectedAddress))
    // eslint-disable-next-line
  }, [selectedAddress])

  useEffect(() => {
    if (validators.length > 0) {
      const total = validators
        .map((validator) => validator.reward?.amount ?? 0)
        .reduce((total, entry) => total + entry)
      setTotalRewards(total)
    }
  }, [validators])

  useEffect(() => {
    if (selectedValidator) {
      setStakeModalOpen(true)
    }
  }, [selectedValidator])

  return (
    <div className="container-fluid">
      {validators.length > 0 && (
        <>
          <div className="row pb-4 justify-content-end align-items-center">
            <StatsLabel className="pr-5">
              {`Inflation: ${(Inflation * 100).toFixed(0)}%`}
            </StatsLabel>
            <StatsLabel className="pr-5">
              {`APR: ${APR.toFixed(1)}%`}
            </StatsLabel>
            <Button onClick={handleClaimRewards}>
              {`Claim Reward: ${thousandSeparator(
                totalRewards.toFixed(2),
                ',',
              )} IXO`}
            </Button>
          </div>
          <div className="row">
            <Table columns={columns} data={validators} />
          </div>
        </>
      )}

      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={['keysafe', 'keplr']}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={stakeModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={handleCloseStakeModal}
      >
        <StakingModal
          walletType={walletType}
          accountAddress={selectedAddress}
          defaultValidator={validators.find(
            (validator) => validator.address === selectedValidator,
          )}
          handleStakingMethodChange={setModalTitle}
        />
      </ModalWrapper>
    </div>
  )
}
export default Stake
