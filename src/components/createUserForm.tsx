import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import type { User } from "@prisma/client";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<Omit<User, "companyId" | "status">>;
  loading: boolean;
  watch?: (params: any) => any;
};

const CreateUserForm = ({ register, loading, watch }: Props) => {
  const checkParentesco = watch("titular") === "D";

  const spacing = 4;
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={spacing}
        marginBottom={spacing * 2}
      >
        <GridItem>
          <FormControl isRequired isDisabled={loading}>
            <FormLabel>Titular</FormLabel>
            <Select {...register("titular")} placeholder=" ">
              <option value="B">Beneficiário</option>
              <option value="D">Dependente</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Nome Titular</FormLabel>
            <Input
              {...register("nomeTitular")}
              type="text"
              placeholder="Nome Titular"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired={checkParentesco}>
            <FormLabel>Parentesco</FormLabel>
            <Select {...register("parentesco")} placeholder=" ">
              <option value={1}>Conjuge</option>
              <option value={2}>Filha(o)</option>
              <option value={3}>Pai</option>
              <option value={4}>Mãe</option>
              <option value={5}>Sogro(a)</option>
              <option value={6}>Irmão(a)</option>
              <option value={7}>Sobrinho(a)</option>
              <option value={8}>Comp.(a)</option>
              <option value={9}>Enteado(a)</option>
              <option value={10}>Neto(a)</option>
              <option value={11}>Cunhado(a)</option>
              <option value={12}>Noivo(a)</option>
              <option value={13}>Primo(a)</option>
              <option value={14}>Namorado(a)</option>
              <option value={15}>Dep. Especial</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired isDisabled={loading}>
            <FormLabel>Matrícula</FormLabel>
            <Input
              {...register("matricula")}
              type="text"
              placeholder="Matrícula"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired isDisabled={loading}>
            <FormLabel>Nome</FormLabel>
            <Input {...register("nome")} type="text" placeholder="Nome" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired isDisabled={loading}>
            <FormLabel>Nascimento</FormLabel>
            <Input
              {...register("nascimento", {
                minLength: 10,
              })}
              as={InputMask}
              mask="**/**/****"
              placeholder="Nascimento"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>RG</FormLabel>
            <Input {...register("rg")} type="text" placeholder="RG" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Data expedição RG</FormLabel>
            <Input
              {...register("rgExpedicao", {
                minLength: 10,
              })}
              as={InputMask}
              mask="**/**/****"
              placeholder="Data expedição RG"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Emissor RG</FormLabel>
            <Input
              {...register("rgEmissor")}
              type="text"
              placeholder="Emissor RG"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>UF RG</FormLabel>
            <Input {...register("rgUf")} type="text" placeholder="UF RG" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>CPF</FormLabel>
            <Input
              {...register("cpf", {
                minLength: 11,
              })}
              type="text"
              placeholder="CPF"
              as={InputMask}
              mask="***.***.***-**"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Sexo</FormLabel>
            <Select {...register("sexo")}>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Data de adimissão</FormLabel>
            <Input
              {...register("dataAdimissao", {
                minLength: 10,
              })}
              as={InputMask}
              mask="**/**/****"
              placeholder="Data Adimissao"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Estado Civil</FormLabel>
            <Select {...register("estadoCivil")} placeholder=" ">
              <option value="C">Casado(a)</option>
              <option value="O">Outros</option>
              <option value="S">Solteiro(a)</option>
              <option value="V">Viuvo(a)</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Nome da Mãe</FormLabel>
            <Input
              {...register("nomeMae")}
              type="text"
              placeholder="Nome da Mãe"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Nome da Pai</FormLabel>
            <Input
              {...register("nomePai")}
              type="text"
              placeholder="Nome da Pai"
            />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={spacing}
        marginBottom={spacing * 2}
      >
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>CEP</FormLabel>
            <Input
              {...register("cep", {
                minLength: 8,
              })}
              type="text"
              placeholder="CEP"
              as={InputMask}
              mask="*****-***"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Logradouro</FormLabel>
            <Input
              {...register("logradouro")}
              type="text"
              placeholder="Logradouro"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Numero</FormLabel>
            <Input {...register("numero")} type="text" placeholder="Numero" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Complemento</FormLabel>
            <Input
              {...register("complemento")}
              type="text"
              placeholder="Complemento"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Bairro</FormLabel>
            <Input {...register("bairro")} type="text" placeholder="Bairro" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Cidade</FormLabel>
            <Input {...register("cidade")} type="text" placeholder="Cidade" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading} isRequired>
            <FormLabel>Estado</FormLabel>
            <Select {...register("estado")} placeholder=" ">
              <option value="MG">Minha Gerais</option>
              <option value="SP">São Paulo</option>
              <option value="AC">Acre</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraiba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={spacing}
        marginBottom={spacing * 2}
      >
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Telefone</FormLabel>
            <Input {...register("fone")} type="text" placeholder="Telefone" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} type="text" placeholder="Email" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Celular</FormLabel>
            <Input {...register("celular")} type="text" placeholder="Celular" />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={spacing}
        marginBottom={spacing * 2}
      >
        <GridItem>
          <GridItem>
            <FormControl isDisabled={loading} isRequired>
              <FormLabel>Plano</FormLabel>
              <Select {...register("plano")} placeholder=" ">
                <option value={1}>Platinum</option>
                <option value={2}>Ouro</option>
                <option value={3}>Onix</option>
              </Select>
            </FormControl>
          </GridItem>
        </GridItem>

        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Doenças Pré-Existentes</FormLabel>
            <Select {...register("doencasPre")} placeholder=" ">
              <option value="N">Não tem</option>
              <option value="C">CPT - cobertura parcial termporária</option>
              <option value="A">Agravo</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Data Vigencia</FormLabel>
            <Input
              {...register("dataVigencia", {
                minLength: 10,
              })}
              as={InputMask}
              mask="**/**/****"
              placeholder="Data Vigencia"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>CNS</FormLabel>
            <Input {...register("cns")} type="text" placeholder="CNS" />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>Doenças Pré-Existentes</FormLabel>
            <Select {...register("origemCarencia")}>
              <option value={1}>ORIGEM DE CARENCIA ISENTO</option>
              <option value={2}>PADRAO LEI 9656</option>
              <option value={3}>COMPRA COM REDUCAO</option>
              <option value={4}>
                COMPRA DE 06 A 12 MESES NO PLANO ANTERIOR
              </option>
              <option value={5}>
                COMPRA DE 13 A 23 MESES NO PLANO ANTERIOR
              </option>
              <option value={6}>
                COMPRA A PARTIR DE 24 MESES NO PLANO ANTERIOR
              </option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isDisabled={loading}>
            <FormLabel>CID</FormLabel>
            <Input {...register("cid")} type="text" placeholder="CID" />
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
};

export default CreateUserForm;
